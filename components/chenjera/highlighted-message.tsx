import type { HighlightRange } from '@/lib/detect'

interface HighlightedMessageProps {
  message: string
  highlights: HighlightRange[]
}

export function HighlightedMessage({ message, highlights }: HighlightedMessageProps) {
  const parts: React.ReactNode[] = []
  let cursor = 0

  highlights.forEach(({ start, end }, i) => {
    if (start > cursor) parts.push(message.slice(cursor, start))
    parts.push(
      <mark
        key={i}
        className="rounded bg-flag px-0.5 font-medium text-foreground underline decoration-risk-high decoration-2 underline-offset-2"
      >
        {message.slice(start, end)}
      </mark>,
    )
    cursor = end
  })
  if (cursor < message.length) parts.push(message.slice(cursor))

  return (
    <blockquote className="whitespace-pre-wrap break-words rounded-xl border bg-background p-4 text-base leading-relaxed">
      {parts}
    </blockquote>
  )
}
