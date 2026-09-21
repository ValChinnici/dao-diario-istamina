import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { searchFoods } from '../domain/search'
import { foodName } from '../domain/foodName'
import { ScoreBadge } from './ScoreBadge'
import type { FoodItem } from '../types'

interface FoodPickerProps {
  placeholder: string
  onPick: (food: FoodItem) => void
}

export function FoodPicker({ placeholder, onPick }: FoodPickerProps) {
  const { lang } = useLanguage()
  const [query, setQuery] = useState('')

  const results = useMemo(() => searchFoods(query, 8), [query])

  return (
    <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
          {results.map((food) => (
            <button
              key={food.id}
              onClick={() => {
                onPick(food)
                setQuery('')
              }}
              className="tap-target w-full text-left rounded-xl px-3 py-2 flex items-center justify-between gap-2"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
            >
              <span className="truncate text-sm" style={{ color: 'var(--text)' }}>
                {foodName(food, lang)}
              </span>
              <ScoreBadge score={food.punteggio_istamina} incerto={food.punteggio_incerto} size="sm" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
