import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { searchFoods } from '../domain/search'
import { foodName } from '../domain/foodName'
import { foods, categories } from '../data/foods'
import { ScoreBadge } from '../components/ScoreBadge'
import { FoodDetailSheet } from '../components/FoodDetailSheet'
import type { FoodItem } from '../types'

export function SearchPage() {
  const { lang, t } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('')
  const [selected, setSelected] = useState<FoodItem | null>(null)

  const trimmedQuery = query.trim()
  const isBrowsing = Boolean(trimmedQuery || category)

  const results = useMemo(() => {
    if (!isBrowsing) return []
    let list = trimmedQuery ? searchFoods(query, 100) : foods
    if (category) list = list.filter((f) => f.categoria === category)
    return list.slice(0, 100)
  }, [query, category, trimmedQuery, isBrowsing])

  return (
    <div className="p-4 flex flex-col gap-4">
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.search.placeholder}
        className="w-full rounded-xl px-4 py-3 text-base outline-none"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm tap-target"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
      >
        <option value="">{t.search.allCategories}</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {!isBrowsing ? (
        <p className="text-sm py-16 text-center leading-relaxed" style={{ color: 'var(--text-faint)' }}>
          {t.search.emptyPrompt}
        </p>
      ) : (
        <>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
            {results.length} {t.search.resultsCount}
          </p>

          {results.length === 0 ? (
            <p className="text-sm py-16 text-center" style={{ color: 'var(--text-faint)' }}>
              {t.search.noResults}
            </p>
          ) : (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              {results.map((food, i) => (
                <button
                  key={food.id}
                  type="button"
                  onClick={() => setSelected(food)}
                  className="tap-target press-feedback w-full text-left flex items-center justify-between gap-3 px-4 py-4"
                  style={{ borderTop: i > 0 ? '1px solid var(--surface-3)' : undefined }}
                >
                  <div className="min-w-0">
                    <div className="font-semibold truncate" style={{ color: 'var(--text)' }}>
                      {foodName(food, lang)}
                    </div>
                    <div className="text-xs truncate mt-0.5" style={{ color: 'var(--text-faint)' }}>
                      {food.categoria}
                      {food.sottocategoria ? ` · ${food.sottocategoria}` : ''}
                    </div>
                  </div>
                  <ScoreBadge score={food.punteggio_istamina} incerto={food.punteggio_incerto} size="sm" />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {selected && <FoodDetailSheet food={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
