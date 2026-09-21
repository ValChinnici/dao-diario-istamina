import { useLanguage } from '../i18n/LanguageContext'
import type { FoodItem } from '../types'

interface FlagChipsProps {
  food: Pick<FoodItem, 'ricco_istamina' | 'altre_ammine' | 'liberatore' | 'bloccante'>
}

export function FlagChips({ food }: FlagChipsProps) {
  const { t } = useLanguage()

  const chips: { key: string; label: string; title: string }[] = []
  if (food.ricco_istamina) {
    chips.push({ key: food.ricco_istamina, label: food.ricco_istamina, title: t.flags[food.ricco_istamina] })
  }
  if (food.altre_ammine) chips.push({ key: 'A', label: 'A', title: t.flags.A })
  if (food.liberatore) chips.push({ key: 'L', label: 'L', title: t.flags.L })
  if (food.bloccante) chips.push({ key: 'B', label: 'B', title: t.flags.B })

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip.key}
          title={chip.title}
          className="tap-target inline-flex items-center justify-center rounded-md text-xs font-semibold"
          style={{
            background: 'var(--surface-3)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            padding: '4px 8px',
            minHeight: 28,
            minWidth: 28,
          }}
        >
          {chip.label}
        </span>
      ))}
    </div>
  )
}
