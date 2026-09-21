import { useLanguage } from '../i18n/LanguageContext'
import { Link } from 'react-router-dom'

export function Header() {
  const { lang, setLang, t } = useLanguage()

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4"
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        minHeight: 56,
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      <Link to="/" className="font-semibold text-base" style={{ color: 'var(--text)' }}>
        {t.appName}
      </Link>
      <div className="flex items-center gap-2">
        <Link
          to="/info"
          aria-label={t.info.title}
          className="tap-target rounded-full flex items-center justify-center"
          style={{ color: 'var(--text-faint)', width: 36, height: 36 }}
        >
          ⓘ
        </Link>
        <div
          role="group"
          aria-label={t.common.language}
          className="inline-flex rounded-full overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          {(['it', 'en'] as const).map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className="tap-target px-3 text-xs font-semibold uppercase"
              style={{
                background: lang === code ? 'var(--accent-soft)' : 'transparent',
                color: lang === code ? 'var(--accent)' : 'var(--text-muted)',
              }}
              aria-pressed={lang === code}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
