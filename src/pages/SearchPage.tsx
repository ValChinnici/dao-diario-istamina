import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { searchFoods } from '../domain/search'
import { foods, categories } from '../data/foods'
import { FoodCard } from '../components/FoodCard'
import { FoodDetailSheet } from '../components/FoodDetailSheet'
import type { FoodItem } from '../types'

export function SearchPage() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('')
  const [selected, setSelected] = useState<FoodItem | null>(null)

  const results = useMemo(() => {
    let list = query.trim() ? searchFoods(query, 100) : foods
    if (category) list = list.filter((f) => f.categoria === category)
    return list.slice(0, 100)
  }, [query, category])

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

      <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
        {results.length} {t.search.resultsCount}
      </p>

      <div className="flex flex-col gap-3">
        {results.map((food) => (
          <FoodCard key={food.id} food={food} onClick={() => setSelected(food)} />
        ))}
        {results.length === 0 && (
          <p className="text-sm py-8 text-center" style={{ color: 'var(--text-faint)' }}>
            {t.search.noResults}
          </p>
        )}
      </div>

      {selected && <FoodDetailSheet food={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
