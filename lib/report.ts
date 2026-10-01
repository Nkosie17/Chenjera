import type { DetectionResult } from './detect'
import { formatReason, type Dictionary } from './translations'
import type { Channel, Sender } from './types'

export interface Analysis {
  result: DetectionResult
  message: string
  channel: Channel
  sender: Sender
  checkedAt: Date
}

export function buildReport(t: Dictionary, analysis: Analysis): string {
  const { result, message, channel, sender, checkedAt } = analysis
  const date = checkedAt.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const reasons = result.reasons.map(
    (r) => `- ${formatReason(t.reasons[r.signal], r.phrase)}`,
  )

  return [
    t.report.header,
    '',
    `${t.report.date}: ${date}`,
    `${t.report.channel}: ${t.channels[channel]}`,
    `${t.report.sender}: ${t.senders[sender]}`,
    `${t.report.threat}: ${t.threats[result.threat]}`,
    `${t.report.risk}: ${t.result.risk[result.risk]}`,
    `${t.report.score}: ${result.score}/100`,
    '',
    `${t.report.message}:`,
    `"${message}"`,
    '',
    `${t.report.reasons}:`,
    ...(reasons.length ? reasons : [`- ${t.result.noFlags}`]),
  ].join('\n')
}
