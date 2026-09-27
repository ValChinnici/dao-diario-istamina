import { useLanguage } from '../i18n/LanguageContext'
import { ScoreBadge } from '../components/ScoreBadge'

const FLAG_KEYS = ['H', 'H!', 'A', 'L', 'B'] as const

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

      <section className="rounded-2xl p-4 flex flex-col gap-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <h2 className="text-lg" style={{ color: 'var(--text)' }}>
          {t.legend.title}
        </h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
            {t.legend.scoreTitle}
          </h3>
          {([0, 1, 2, 3] as const).map((score) => (
            <div key={score} className="flex items-start gap-3">
              <ScoreBadge score={score} size="sm" />
              <p className="text-sm flex-1" style={{ color: 'var(--text)' }}>
                {t.legend.scores[score]}
              </p>
            </div>
          ))}
          <div className="flex items-start gap-3">
            <ScoreBadge score={null} incerto size="sm" />
            <p className="text-sm flex-1" style={{ color: 'var(--text)' }}>
              {t.legend.scores['?']}
            </p>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
            {t.legend.scores['-']}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
            {t.legend.flagsTitle}
          </h3>
          {FLAG_KEYS.map((flag) => (
            <div key={flag} className="flex items-start gap-3">
              <span
                className="tap-target inline-flex items-center justify-center rounded-md text-xs font-semibold shrink-0"
                style={{
                  background: 'var(--surface-3)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  minHeight: 28,
                  minWidth: 28,
                  padding: '4px 8px',
                }}
              >
                {flag}
              </span>
              <p className="text-sm flex-1" style={{ color: 'var(--text)' }}>
                {t.legend.flags[flag]}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs italic" style={{ color: 'var(--text-faint)' }}>
          {t.legend.note}
        </p>
      </section>
    </div>
  )
}
