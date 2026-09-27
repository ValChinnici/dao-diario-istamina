import { useMemo, useState } from 'react'
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
          className="absolute left-0 right-0 mt-2 flex flex-col gap-2 rounded-xl p-2 overflow-y-auto"
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            maxHeight: 280,
            zIndex: 30,
          }}
        >
          {results.map((food) => {
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
                className="tap-target w-full text-left rounded-xl px-3 py-2 flex items-center justify-between gap-2"
                style={{
                  background: 'var(--surface-3)',
                  border: '1px solid var(--border)',
                  opacity: added ? 0.6 : 1,
                }}
              >
                <span className="truncate text-sm" style={{ color: 'var(--text)' }}>
                  {foodName(food, lang)}
                </span>
                {added ? (
                  <span className="text-xs shrink-0" style={{ color: 'var(--safe)' }}>
                    ✓ {alreadyAddedLabel}
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
