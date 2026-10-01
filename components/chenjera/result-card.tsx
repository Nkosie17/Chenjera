'use client'

import { forwardRef } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Tag,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatReason } from '@/lib/translations'
import type { Analysis } from '@/lib/report'
import type { RiskLevel } from '@/lib/types'
import { HighlightedMessage } from './highlighted-message'
import { ReportDialog } from './report-dialog'
import { useLanguage } from './language-provider'

const RISK_STYLES: Record<
  RiskLevel,
  { banner: string; badge: string; bar: string; Icon: typeof ShieldAlert }
> = {
  high: {
    banner: 'bg-risk-high text-white',
    badge: 'text-risk-high',
    bar: 'bg-risk-high',
    Icon: ShieldAlert,
  },
  medium: {
    banner: 'bg-risk-medium-soft text-risk-medium border-b border-risk-medium/30',
    badge: 'text-risk-medium',
    bar: 'bg-risk-medium',
    Icon: ShieldQuestion,
  },
  low: {
    banner: 'bg-risk-low-soft text-risk-low border-b border-risk-low/30',
    badge: 'text-risk-low',
    bar: 'bg-risk-low',
    Icon: ShieldCheck,
  },
}

export const ResultCard = forwardRef<HTMLHeadingElement, { analysis: Analysis }>(
  function ResultCard({ analysis }, headingRef) {
    const { t } = useLanguage()
    const { result, message } = analysis
    const style = RISK_STYLES[result.risk]
    const RiskIcon = style.Icon
    const textReasons = result.reasons

    return (
      <Card className="gap-0 overflow-hidden rounded-2xl py-0">
        <div className={cn('flex items-center gap-3 px-5 py-5', style.banner)}>
          <RiskIcon className="size-8 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium uppercase tracking-wide opacity-90">
              {t.result.heading}
            </p>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold leading-tight outline-none">
              {t.result.verdict[result.risk]}
            </h2>
          </div>
        </div>

        <CardContent className="flex flex-col gap-6 py-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <span
                className={cn(
                  'inline-flex min-h-9 items-center gap-1.5 text-base font-semibold',
                  style.badge,
                )}
              >
                <RiskIcon className="size-4" aria-hidden="true" />
                {t.result.risk[result.risk]}
              </span>
              <span className="inline-flex min-h-9 items-center gap-1.5 text-base font-semibold text-navy">
                <Tag className="size-4" aria-hidden="true" />
                <span className="sr-only">{t.result.threatLabel}: </span>
                {t.threats[result.threat]}
              </span>
            </div>

            <div>
              <div className="mb-1 flex justify-between text-base">
                <span className="text-muted-foreground">{t.result.scoreLabel}</span>
                <span className="font-semibold tabular-nums">{result.score}/100</span>
              </div>
              <div
                role="meter"
                aria-label={t.result.scoreLabel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={result.score}
                className="h-3 overflow-hidden rounded-full bg-muted"
              >
                <div
                  className={cn('h-full rounded-full transition-[width] duration-500', style.bar)}
                  style={{ width: `${Math.max(result.score, 2)}%` }}
                />
              </div>
            </div>
          </div>

          <section aria-labelledby="why-heading" className="flex flex-col gap-3">
            <h3 id="why-heading" className="flex items-center gap-2 text-lg font-semibold text-navy">
              <AlertTriangle className="size-5" aria-hidden="true" />
              {t.result.whyHeading}
            </h3>
            {result.highlights.length > 0 && (
              <p className="text-base text-muted-foreground">{t.result.highlightedLabel}</p>
            )}
            <HighlightedMessage message={message} highlights={result.highlights} />
            <ul className="flex flex-col gap-2">
              {textReasons.map((reason) => (
                <li key={reason.signal} className="flex gap-2 text-base leading-relaxed">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-2.5 size-2 shrink-0 rounded-full',
                      reason.signal === 'knownSender' ? 'bg-risk-low' : 'bg-risk-high',
                    )}
                  />
                  {formatReason(t.reasons[reason.signal], reason.phrase)}
                </li>
              ))}
              {result.highlights.length === 0 && result.risk === 'low' && (
                <li className="flex gap-2 text-base leading-relaxed">
                  <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-risk-low" />
                  {t.result.noFlags}
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="todo-heading" className="flex flex-col gap-3">
            <h3 id="todo-heading" className="flex items-center gap-2 text-lg font-semibold text-navy">
              <ListChecks className="size-5" aria-hidden="true" />
              {t.result.whatToDo}
            </h3>
            <ul className="flex flex-col gap-2">
              {t.actions[result.threat].map((action) => (
                <li key={action} className="flex gap-2 text-base leading-relaxed">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  {action}
                </li>
              ))}
            </ul>
          </section>

          {result.showVerifyBack && (
            <section
              aria-labelledby="confirm-heading"
              className="flex flex-col gap-3 rounded-xl border border-navy/20 bg-navy-soft p-4"
            >
              <h3 id="confirm-heading" className="flex items-center gap-2 text-lg font-semibold text-navy">
                <PhoneCall className="size-5" aria-hidden="true" />
                {t.result.confirmHeading}
              </h3>
              <p className="text-base">{t.result.confirmIntro}</p>
              <ol className="flex flex-col gap-3">
                {t.verifySteps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-base leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="sr-only">{i + 1}. </span>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <ReportDialog analysis={analysis} />
        </CardContent>
      </Card>
    )
  },
)
