import { useLanguage } from '../i18n/LanguageContext'
import { scoreColors } from '../domain/scoreColor'
import type { IstaminaScore } from '../types'

interface ScoreBadgeProps {
  score: IstaminaScore
  incerto?: boolean
  size?: 'sm' | 'md'
}

export function ScoreBadge({ score, incerto, size = 'md' }: ScoreBadgeProps) {
  const { t } = useLanguage()
  const colors = scoreColors(score, incerto)
  const isUnsure = incerto || score === null
  const label = isUnsure ? t.badge.unsure : t.badge[score as 0 | 1 | 2 | 3]
  const numberLabel = isUnsure ? '?' : score

  const padding = size === 'sm' ? '4px 10px' : '6px 12px'
  const fontSize = size === 'sm' ? '0.75rem' : '0.85rem'

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full font-medium whitespace-nowrap"
      style={{
        background: colors.bg,
        color: colors.text,
        padding,
        fontSize,
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block rounded-full shrink-0"
        style={{ width: 8, height: 8, background: colors.dot }}
      />
      <span>
        {numberLabel} · {label}
      </span>
    </span>
  )
}
