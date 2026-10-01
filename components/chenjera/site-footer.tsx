'use client'

import { Lock } from 'lucide-react'
import { useLanguage } from './language-provider'

export function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="flex flex-col gap-1 border-t pt-6 text-base text-muted-foreground">
      <p className="flex gap-2">
        <Lock className="mt-1 size-4 shrink-0" aria-hidden="true" />
        {t.footer.privacy}
      </p>
      <p className="pl-6">{t.footer.disclaimer}</p>
    </footer>
  )
}
