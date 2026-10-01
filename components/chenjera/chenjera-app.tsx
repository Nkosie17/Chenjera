'use client'

import { useRef, useState } from 'react'
import { detect } from '@/lib/detect'
import type { Analysis } from '@/lib/report'
import type { Sample } from '@/lib/samples'
import type { Channel, Sender } from '@/lib/types'
import { LanguageProvider } from './language-provider'
import { MessageForm } from './message-form'
import { ResultCard } from './result-card'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

export function ChenjeraApp() {
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState<Channel>('sms')
  const [sender, setSender] = useState<Sender>('unknown')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const resultHeadingRef = useRef<HTMLHeadingElement>(null)

  function handleSample(sample: Sample) {
    setMessage(sample.text)
    setChannel(sample.channel)
    setSender(sample.sender)
  }

  function handleSubmit() {
    const text = message.trim()
    setAnalysis({
      result: detect({ message: text, channel, sender }),
      message: text,
      channel,
      sender,
      checkedAt: new Date(),
    })
    requestAnimationFrame(() => {
      resultHeadingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      resultHeadingRef.current?.focus({ preventScroll: true })
    })
  }

  return (
    <LanguageProvider>
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 py-6 sm:py-10">
        <SiteHeader />
        <main className="flex flex-col gap-6">
          <MessageForm
            message={message}
            channel={channel}
            sender={sender}
            onMessageChange={setMessage}
            onChannelChange={setChannel}
            onSenderChange={setSender}
            onSample={handleSample}
            onSubmit={handleSubmit}
          />
          <div aria-live="polite" className="scroll-mt-4">
            {analysis && <ResultCard ref={resultHeadingRef} analysis={analysis} />}
          </div>
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  )
}
