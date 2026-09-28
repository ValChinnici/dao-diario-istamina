import { useMemo, useState } from 'react'
import { Check } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext'
import { searchFoods } from '../domain/search'
import { foodName } from '../domain/foodName'
import { ScoreBadge } from './ScoreBadge'
import type { FoodItem } from '../types'

interface FoodPickerProps {
  placeholder: string
  onPick: (food: FoodItem) => void
  isAdded?: (food: FoodItem) => boolean
  alreadyAddedLabel: string
}

export function FoodPicker({ placeholder, onPick, isAdded, alreadyAddedLabel }: FoodPickerProps) {
  const { lang } = useLanguage()
  const [query, setQuery] = useState('')

  const results = useMemo(() => searchFoods(query, 8), [query])

  return (
    <div className="relative" style={{ isolation: 'isolate' }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-base outline-none"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
      />
      {results.length > 0 && (
        <div
          className="anim-scale-in absolute left-0 right-0 mt-2 rounded-xl overflow-y-auto"
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            maxHeight: 280,
            zIndex: 30,
            transformOrigin: 'top center',
          }}
        >
          {results.map((food, i) => {
            const added = isAdded?.(food) ?? false
            return (
              <button
                key={food.id}
                type="button"
                disabled={added}
                onClick={() => {
                  if (added) return
                  onPick(food)
                  setQuery('')
                }}
                className="tap-target w-full text-left px-3 py-2.5 flex items-center justify-between gap-2"
                style={{
                  opacity: added ? 0.6 : 1,
                  borderTop: i > 0 ? '1px solid var(--surface-3)' : undefined,
                }}
              >
                <span className="truncate text-sm" style={{ color: 'var(--text)' }}>
                  {foodName(food, lang)}
                </span>
                {added ? (
                  <span className="text-xs shrink-0 inline-flex items-center gap-1" style={{ color: 'var(--safe)' }}>
                    <Check size={14} weight="bold" aria-hidden="true" />
                    {alreadyAddedLabel}
                  </span>
                ) : (
                  <ScoreBadge score={food.punteggio_istamina} incerto={food.punteggio_incerto} size="sm" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
