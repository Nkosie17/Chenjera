export type Lang = 'en' | 'sn' | 'nd'

export type Channel = 'sms' | 'whatsapp' | 'email' | 'voice' | 'video' | 'web'

export type Sender = 'known' | 'unknown'

export type RiskLevel = 'low' | 'medium' | 'high'

export type ThreatType =
  | 'phishing'
  | 'financial'
  | 'identity'
  | 'maliciousLink'
  | 'aiThreat'
  | 'benign'

/** Signals found in the message text itself. */
export type TextSignalId =
  | 'credential'
  | 'money'
  | 'prize'
  | 'urgency'
  | 'link'
  | 'authority'

/** Signals that come from context (channel / sender) rather than the text. */
export type ContextSignalId = 'voiceRequest' | 'unknownSender' | 'knownSender'

export type SignalId = TextSignalId | ContextSignalId

export const CHANNELS: Channel[] = ['sms', 'whatsapp', 'email', 'voice', 'video', 'web']
export const SENDERS: Sender[] = ['known', 'unknown']
export const LANGS: Lang[] = ['en', 'sn', 'nd']
