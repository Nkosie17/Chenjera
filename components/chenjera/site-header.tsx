'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { translations } from '@/lib/translations'
import { LANGS } from '@/lib/types'
import { useLanguage } from './language-provider'

const SHORT_LABEL = { en: 'EN', sn: 'SN', nd: 'ND' } as const

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <Image
          src="/chenjera-logo.png"
          alt={`${t.appName} – Check before you trust`}
          width={1225}
          height={410}
          priority
          className="h-16 w-auto self-start sm:h-20"
        />
        {lang !== 'en' && (
          <p className="text-base text-muted-foreground">{t.tagline}</p>
        )}
      </div>

      <div role="group" aria-label={t.languageLabel} className="flex rounded-xl border bg-card p-1">
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={lang === code}
            aria-label={translations[code].langName}
            onClick={() => setLang(code)}
            className={cn(
              'min-h-11 flex-1 rounded-lg px-4 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              lang === code
                ? 'bg-navy text-white'
                : 'text-navy hover:bg-navy-soft',
            )}
          >
            <span aria-hidden="true" className="sm:hidden">
              {SHORT_LABEL[code]}
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              {translations[code].langName}
            </span>
          </button>
        ))}
      </div>
    </header>
  )
}
