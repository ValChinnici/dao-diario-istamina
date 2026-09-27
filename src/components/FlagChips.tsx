import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import type { FoodItem } from '../types'

interface FlagChipsProps {
  food: Pick<FoodItem, 'ricco_istamina' | 'altre_ammine' | 'liberatore' | 'bloccante'>
}

export function FlagChips({ food }: FlagChipsProps) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState<string | null>(null)

  const chips: { key: string; label: string; description: string }[] = []
  if (food.ricco_istamina) {
    chips.push({ key: food.ricco_istamina, label: food.ricco_istamina, description: t.legend.flags[food.ricco_istamina] })
  }
  if (food.altre_ammine) chips.push({ key: 'A', label: 'A', description: t.legend.flags.A })
  if (food.liberatore) chips.push({ key: 'L', label: 'L', description: t.legend.flags.L })
  if (food.bloccante) chips.push({ key: 'B', label: 'B', description: t.legend.flags.B })

  if (chips.length === 0) return null

  const activeChip = chips.find((c) => c.key === expanded)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap gap-1.5">
        {chips.map((chip) => {
          const isActive = expanded === chip.key
          return (
            <button
              key={chip.key}
              type="button"
              title={chip.description}
              aria-label={chip.description}
              aria-expanded={isActive}
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(isActive ? null : chip.key)
              }}
              className="tap-target inline-flex items-center justify-center rounded-md text-xs font-semibold"
              style={{
                background: isActive ? 'var(--accent-soft)' : 'var(--surface-3)',
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                padding: '4px 8px',
                minHeight: 28,
                minWidth: 28,
              }}
            >
              {chip.label}
            </button>
          )
        })}
      </div>
      {activeChip && (
        <p
          className="text-xs rounded-lg px-3 py-2"
          style={{ background: 'var(--surface-3)', color: 'var(--text)' }}
        >
          <strong>{activeChip.label}</strong> · {activeChip.description}
        </p>
      )}
    </div>
  )
}
