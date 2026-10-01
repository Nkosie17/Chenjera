'use client'

import { useRef, useState } from 'react'
import { Check, Copy, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { buildReport, type Analysis } from '@/lib/report'
import { useLanguage } from './language-provider'

type CopyState = 'idle' | 'copied' | 'failed'

export function ReportDialog({ analysis }: { analysis: Analysis }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const textRef = useRef<HTMLTextAreaElement>(null)
  const report = buildReport(t, analysis)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(report)
      setCopyState('copied')
    } catch {
      textRef.current?.select()
      setCopyState('failed')
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => {
          setCopyState('idle')
          setOpen(true)
        }}
        className="h-12 w-full rounded-xl border-navy/30 text-base text-navy sm:w-auto"
      >
        <Flag aria-hidden="true" />
        {t.result.reportButton}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg text-navy">{t.report.title}</DialogTitle>
            <DialogDescription className="text-base">{t.report.description}</DialogDescription>
          </DialogHeader>

          <textarea
            ref={textRef}
            readOnly
            value={report}
            rows={14}
            aria-label={t.report.title}
            className="w-full resize-none rounded-xl border bg-background p-3 font-mono text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-ring"
          />

          <p aria-live="polite" className="min-h-6 text-base">
            {copyState === 'copied' && (
              <span className="font-medium text-risk-low">{t.report.copied}</span>
            )}
            {copyState === 'failed' && (
              <span className="text-destructive">{t.report.copyFailed}</span>
            )}
          </p>

          <DialogFooter className="gap-2">
            <DialogClose
              render={
                <Button variant="outline" size="lg" className="h-12 rounded-xl text-base" />
              }
            >
              {t.report.close}
            </DialogClose>
            <Button type="button" size="lg" onClick={handleCopy} className="h-12 rounded-xl text-base">
              {copyState === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {copyState === 'copied' ? t.report.copied : t.report.copy}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
