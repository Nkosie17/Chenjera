'use client'

import { useId, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SAMPLES, type Sample } from '@/lib/samples'
import { CHANNELS, SENDERS, type Channel, type Sender } from '@/lib/types'
import { useLanguage } from './language-provider'

interface MessageFormProps {
  message: string
  channel: Channel
  sender: Sender
  onMessageChange: (value: string) => void
  onChannelChange: (value: Channel) => void
  onSenderChange: (value: Sender) => void
  onSample: (sample: Sample) => void
  onSubmit: () => void
}

export function MessageForm({
  message,
  channel,
  sender,
  onMessageChange,
  onChannelChange,
  onSenderChange,
  onSample,
  onSubmit,
}: MessageFormProps) {
  const { t } = useLanguage()
  const [showError, setShowError] = useState(false)
  const messageId = useId()
  const errorId = useId()
  const channelId = useId()
  const senderId = useId()

  const channelItems = CHANNELS.map((value) => ({ value, label: t.channels[value] }))
  const senderItems = SENDERS.map((value) => ({ value, label: t.senders[value] }))

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!message.trim()) {
      setShowError(true)
      return
    }
    setShowError(false)
    onSubmit()
  }

  return (
    <Card className="rounded-2xl">
      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold text-navy">{t.input.heading}</h1>

          <div className="flex flex-col gap-2">
            <Label htmlFor={messageId} className="text-base font-medium">
              {t.input.messageLabel}
            </Label>
            <Textarea
              id={messageId}
              value={message}
              onChange={(e) => {
                onMessageChange(e.target.value)
                if (showError) setShowError(false)
              }}
              placeholder={t.input.messagePlaceholder}
              rows={5}
              aria-invalid={showError || undefined}
              aria-describedby={showError ? errorId : undefined}
              className="min-h-36 rounded-xl bg-background p-3 text-base md:text-base"
            />
            {showError && (
              <p id={errorId} role="alert" className="text-base font-medium text-destructive">
                {t.input.emptyError}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label id={channelId} className="text-base font-medium">
                {t.input.channelLabel}
              </Label>
              <Select
                items={channelItems}
                value={channel}
                onValueChange={(value) => value && onChannelChange(value as Channel)}
              >
                <SelectTrigger aria-labelledby={channelId} className="h-12 w-full rounded-xl text-base data-[size=default]:h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {channelItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="min-h-11 text-base">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label id={senderId} className="text-base font-medium">
                {t.input.senderLabel}
              </Label>
              <Select
                items={senderItems}
                value={sender}
                onValueChange={(value) => value && onSenderChange(value as Sender)}
              >
                <SelectTrigger aria-labelledby={senderId} className="h-12 w-full rounded-xl text-base data-[size=default]:h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {senderItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="min-h-11 text-base">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" size="lg" className="h-13 rounded-xl text-base font-semibold">
            <Search aria-hidden="true" />
            {t.input.check}
          </Button>

          <div className="flex flex-col gap-2">
            <p className="text-base text-muted-foreground">{t.input.samplesLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {SAMPLES.map((sample) => (
                <li key={sample.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowError(false)
                      onSample(sample)
                    }}
                    className="min-h-11 rounded-full border border-navy/20 bg-navy-soft px-4 text-base text-navy transition-colors hover:border-navy/40 hover:bg-navy/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {t.samples[sample.id]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
