/**
 * Chenjera detection engine.
 *
 * Pure, synchronous TypeScript. It never fetches, opens or visits anything:
 * URLs are only matched as text.
 *
 * How it works:
 *   1. Every text signal has a list of case-insensitive patterns
 *      (English plus common Shona / Ndebele scam words).
 *   2. Each signal that matches at least once adds its weight ONCE.
 *   3. Context signals (channel, sender) add or subtract weight.
 *   4. The score is clamped to 0-100 and mapped to a risk level.
 *   5. A threat type is chosen by priority rules (see classifyThreat).
 *
 * To tune the engine, edit SIGNAL_WEIGHTS, RISK_THRESHOLDS or the pattern
 * lists in TEXT_SIGNALS below.
 */

import type {
  Channel,
  RiskLevel,
  Sender,
  SignalId,
  TextSignalId,
  ThreatType,
} from './types'

// ---------------------------------------------------------------------------
// Tunable weights and thresholds
// ---------------------------------------------------------------------------

export const SIGNAL_WEIGHTS: Record<SignalId, number> = {
  credential: 40, // PIN, OTP, password, ID, account details
  money: 25, // transfer / send money, pay now, new account
  prize: 25, // "you have won", prize, reward
  urgency: 15, // urgent, today, suspended, expires
  link: 15, // URLs, "click", attachments
  authority: 15, // manager, bank, ZIMRA, police, government
  voiceRequest: 15, // voice/video channel + credential, money or urgency
  unknownSender: 10, // user says they do not know the sender
  knownSender: -20, // known sender AND no other signals
}

/** Scores at or above these values move into the next risk level. */
export const RISK_THRESHOLDS = {
  medium: 30,
  high: 60,
} as const

export const MAX_SCORE = 100

// ---------------------------------------------------------------------------
// Patterns
// ---------------------------------------------------------------------------

/**
 * A pattern either matches on its own, or only when `onlyIf` also matches
 * somewhere in the message (e.g. a dollar amount only counts as a prize
 * signal when the message also says "won").
 */
type PatternRule = RegExp | { pattern: RegExp; onlyIf: RegExp }

interface TextSignal {
  id: TextSignalId
  patterns: PatternRule[]
}

const URL_PATTERN =
  /(?:https?:\/\/|www\.)[^\s<>"']+|\b[a-z0-9-]+\.(?:com|net|org|info|co\.zw|ac\.zw|gov\.zw|zw|xyz|top|online|site|click|link|ly|me)\b(?:\/[^\s<>"']*)?/i

export const TEXT_SIGNALS: TextSignal[] = [
  {
    id: 'credential',
    patterns: [
      /\bPIN\b/i,
      /\bOTP\b/i,
      /\bone[- ]time (?:pin|password|code)\b/i,
      /\bpass(?:word|code)s?\b/i,
      /\b(?:verification|security|confirmation) code\b/i,
      /\bCVV\b/i,
      /\bnational id\b/i,
      /\bid (?:number|card|copy)\b/i,
      /\baccount (?:details|number|information|info)\b/i,
      /\b(?:bank|card|login|mobile money|ecocash|onemoney|innbucks) details\b/i,
      /\b(?:verify|confirm|update|validate) your (?:details|account|identity|information)\b/i,
      // Shona
      /\bnhamba yako yechivande\b/i,
      /\bpasiwedhi\b/i,
      // Ndebele
      /\binombolo (?:yakho )?eyimfihlo\b/i,
    ],
  },
  {
    id: 'money',
    patterns: [
      /\btransfer (?:the |some )?(?:money|funds|cash|payment)\b/i,
      /\bsend (?:the |some |us )?(?:money|funds|cash|payment)\b/i,
      /\bnew (?:bank )?account\b/i,
      /\bpay (?:now|immediately|today)\b/i,
      /\bpayment (?:has )?(?:failed|was declined|is pending)\b/i,
      /\breverse (?:the |your )?(?:transaction|payment)\b/i,
      /\b(?:processing|release|clearance|admin(?:istration)?|delivery) fee\b/i,
      // Shona
      /\btumira mari\b/i,
      /\bendesa mari\b/i,
      // Ndebele
      /\bthumela imali\b/i,
    ],
  },
  {
    id: 'prize',
    patterns: [
      /\byou(?:'ve| have)? (?:just )?won\b/i,
      /\bcongratulations\b/i,
      /\bprizes?\b/i,
      /\bwinner\b/i,
      /\blucky (?:draw|winner|number)\b/i,
      /\bclaim your (?:reward|prize|gift|money)\b/i,
      {
        pattern: /(?:US\$|USD|ZWG|ZiG|\$)\s?\d[\d,.]*/i,
        onlyIf: /\bw[oi]n\b|wahwina|uwinile/i,
      },
      // Shona
      /\bwahwina\b/i,
      /\bmubairo\b/i,
      /\bmakorokoto\b/i,
      // Ndebele
      /\buwinile\b/i,
      /\bumklomelo\b/i,
      /\bsiyakuhalalisela\b/i,
    ],
  },
  {
    id: 'urgency',
    patterns: [
      /\b(?:immediately|urgent(?:ly)?|asap|right away|right now|act now)\b/i,
      /\btoday\b/i,
      /\bwithin \d+ (?:hours?|minutes?|hrs?|mins?)\b/i,
      /\b(?:suspended|suspension|disabled|deactivated|blocked|locked)\b/i,
      /\bexpir(?:e|es|ed|ing|y)\b/i,
      /\bfinal (?:notice|warning|reminder)\b/i,
      /\blast chance\b/i,
      /\bmailbox (?:is )?(?:almost )?full\b/i,
      /\bunusual (?:activity|sign-?in|login)\b/i,
      // Shona
      /\bkurumidza\b/i,
      /\bnhasi\b/i,
      /\bpakarepo\b/i,
      // Ndebele
      /\bmasinyane\b/i,
      /\blamuhla\b/i,
      /\bngokuphangisa\b/i,
    ],
  },
  {
    id: 'link',
    patterns: [
      URL_PATTERN,
      /\bclick(?: here| the link| below| on the link)?\b/i,
      /\btap (?:here|the link|below)\b/i,
      /\b(?:the |this )?link (?:below|above|provided)\b/i,
      /\b(?:sign|log) ?in now\b/i,
      /\b(?:download|open) the attach(?:ed|ment)\b/i,
      /\bsee (?:the )?attached\b/i,
    ],
  },
  {
    id: 'authority',
    patterns: [
      /\b(?:manager|boss|director|supervisor|CEO|headmaster|principal)\b/i,
      /\bbank\b/i,
      /\bZIMRA\b/,
      /\b(?:police|ZRP)\b/i,
      /\bpublic official\b/i,
      /\bgovernment\b/i,
      /\bministry\b/i,
      /\byour (?:network |service |mobile )?provider\b/i,
      /\b(?:econet|netone|telecel|ecocash)\b/i,
      // Shona
      /\bhurumende\b/i,
      /\bmapurisa\b/i,
      // Ndebele
      /\bihulumende\b/i,
      /\bamaphoyisa\b/i,
    ],
  },
]

/** Not scored. Used only to tell Phishing apart from Identity Fraud. */
const ACCOUNT_NOTICE_PATTERN =
  /suspend|disabled|deactivat|locked|mailbox|verify your|confirm your|update your|unusual (?:activity|sign|login)|account will be|security alert|sign ?in|log ?in/i

/** Not scored. Text that describes a voice note / video of someone. */
const VOICE_VIDEO_MENTION_PATTERN = /\b(?:voice (?:message|note|call|recording)|video(?: call| message)?)\b/i

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SignalMatch {
  signal: TextSignalId
  /** Character offset where the match starts in the original message. */
  start: number
  /** Character offset just after the match ends. */
  end: number
  text: string
}

export interface HighlightRange {
  start: number
  end: number
}

export interface Reason {
  signal: SignalId
  /** First matched phrase for this signal, if it came from the text. */
  phrase?: string
}

export interface DetectionInput {
  message: string
  channel: Channel
  sender: Sender
}

export interface DetectionResult {
  score: number
  risk: RiskLevel
  threat: ThreatType
  /** Every signal that contributed to the score, strongest first. */
  signals: SignalId[]
  matches: SignalMatch[]
  /** Non-overlapping ranges to highlight in the UI. */
  highlights: HighlightRange[]
  reasons: Reason[]
  /** Show the "How to confirm this request" panel. */
  showVerifyBack: boolean
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

function toGlobal(pattern: RegExp): RegExp {
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
  return new RegExp(pattern.source, flags)
}

function findMatches(message: string): SignalMatch[] {
  const matches: SignalMatch[] = []

  for (const signal of TEXT_SIGNALS) {
    for (const rule of signal.patterns) {
      const pattern = rule instanceof RegExp ? rule : rule.pattern
      if (!(rule instanceof RegExp) && !rule.onlyIf.test(message)) continue

      for (const m of message.matchAll(toGlobal(pattern))) {
        if (!m[0] || m.index === undefined) continue
        matches.push({
          signal: signal.id,
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
        })
      }
    }
  }

  return matches.sort((a, b) => a.start - b.start || b.end - a.end)
}

function mergeRanges(matches: SignalMatch[]): HighlightRange[] {
  const merged: HighlightRange[] = []
  for (const { start, end } of matches) {
    const last = merged[merged.length - 1]
    if (last && start <= last.end) {
      last.end = Math.max(last.end, end)
    } else {
      merged.push({ start, end })
    }
  }
  return merged
}

export function riskFromScore(score: number): RiskLevel {
  if (score >= RISK_THRESHOLDS.high) return 'high'
  if (score >= RISK_THRESHOLDS.medium) return 'medium'
  return 'low'
}

/**
 * Threat type priority:
 *   0. Low risk                                           -> Benign
 *      (so a "Looks safe" verdict never shows a scary label)
 *   1. Voice/video channel with impersonation, or text that
 *      describes a voice note / video of an authority      -> AI-Enabled Threat
 *   2. Prize claim or money request (incl. payment-failed)  -> Financial Scam
 *      (checked before credentials so "send your PIN to reverse
 *      the payment" is treated as a money scam)
 *   3. Credential request                                   -> Phishing if it mimics an
 *                                                              account notice, otherwise
 *                                                              Identity Fraud
 *   4. Link or attachment prompt                            -> Phishing if it mimics an
 *                                                              account notice, otherwise
 *                                                              Malicious Link
 *   5. Anything else at Medium/High (pressure, impersonation) -> Phishing
 */
function classifyThreat(
  message: string,
  channel: Channel,
  found: Set<SignalId>,
  risk: RiskLevel,
): ThreatType {
  if (risk === 'low') return 'benign'

  const isVoiceOrVideo = channel === 'voice' || channel === 'video'
  const mentionsVoiceOrVideo = VOICE_VIDEO_MENTION_PATTERN.test(message)
  if (found.has('authority') && (isVoiceOrVideo || mentionsVoiceOrVideo)) {
    return 'aiThreat'
  }

  if (found.has('prize') || found.has('money')) return 'financial'

  if (found.has('credential')) {
    return ACCOUNT_NOTICE_PATTERN.test(message) ? 'phishing' : 'identity'
  }

  if (found.has('link')) {
    return ACCOUNT_NOTICE_PATTERN.test(message) ? 'phishing' : 'maliciousLink'
  }

  return 'phishing'
}

export function detect({ message, channel, sender }: DetectionInput): DetectionResult {
  const matches = findMatches(message)
  const found = new Set<SignalId>(matches.map((m) => m.signal))

  const isVoiceOrVideo = channel === 'voice' || channel === 'video'
  if (
    isVoiceOrVideo &&
    (found.has('credential') || found.has('money') || found.has('urgency'))
  ) {
    found.add('voiceRequest')
  }

  if (sender === 'unknown') {
    found.add('unknownSender')
  } else if (found.size === 0) {
    found.add('knownSender')
  }

  const rawScore = [...found].reduce((sum, id) => sum + SIGNAL_WEIGHTS[id], 0)
  const score = Math.max(0, Math.min(MAX_SCORE, rawScore))
  const risk = riskFromScore(score)
  const threat = classifyThreat(message, channel, found, risk)

  const signals = [...found].sort(
    (a, b) => Math.abs(SIGNAL_WEIGHTS[b]) - Math.abs(SIGNAL_WEIGHTS[a]),
  )

  const reasons: Reason[] = signals.map((signal) => ({
    signal,
    phrase: matches.find((m) => m.signal === signal)?.text,
  }))

  return {
    score,
    risk,
    threat,
    signals,
    matches,
    highlights: mergeRanges(matches),
    reasons,
    showVerifyBack:
      threat === 'aiThreat' ||
      threat === 'financial' ||
      (risk !== 'low' && found.has('money')),
  }
}
