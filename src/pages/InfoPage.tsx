import { useLanguage } from '../i18n/LanguageContext'

export function InfoPage() {
  const { t } = useLanguage()

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl">{t.info.title}</h1>

      <div className="rounded-2xl p-4" style={{ background: 'var(--warn-soft)', border: '1px solid var(--border)' }}>
        <h2 className="text-base mb-2" style={{ color: 'var(--warn)' }}>
          {t.info.disclaimerTitle}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
          {t.info.disclaimer}
        </p>
      </div>

      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {t.info.dataSource}
      </p>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {t.info.privacy}
      </p>
    </div>
  )
}
