import { useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext'
import { db } from '../db'
import { ScoreBadge } from '../components/ScoreBadge'
import type { MealIngredient } from '../types'

function dedupeRecentIngredients(entries: { timestamp: number; ingredienti: MealIngredient[] }[]): MealIngredient[] {
  const seen = new Map<string, MealIngredient>()
  for (const entry of entries) {
    for (const ing of entry.ingredienti) {
      if (!seen.has(ing.foodId)) seen.set(ing.foodId, ing)
    }
  }
  return Array.from(seen.values())
}

export function HomePage() {
  const { lang, t } = useLanguage()

  const meals = useLiveQuery(() => db.meals.orderBy('timestamp').reverse().limit(60).toArray(), [])

  const { highRisk, safe, weekCounts } = useMemo(() => {
    if (!meals) return { highRisk: [], safe: [], weekCounts: { safe: 0, risk: 0 } }

    const allIngredients = dedupeRecentIngredients(meals)
    const highRisk = allIngredients.filter((i) => i.punteggio_istamina === 2 || i.punteggio_istamina === 3).slice(0, 8)
    const safe = allIngredients.filter((i) => i.punteggio_istamina === 0 || i.punteggio_istamina === 1).slice(0, 8)

    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const weekMeals = meals.filter((m) => m.timestamp >= weekAgo)
    const weekCounts = weekMeals.reduce(
      (acc, m) => {
        if (m.punteggio_massimo === 2 || m.punteggio_massimo === 3) acc.risk += 1
        else acc.safe += 1
        return acc
      },
      { safe: 0, risk: 0 },
    )

    return { highRisk, safe, weekCounts }
  }, [meals])

  const maxWeekCount = Math.max(weekCounts.safe, weekCounts.risk, 1)

  return (
    <div className="p-4 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl">{t.home.title}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {t.home.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/ricerca"
          className="tap-target press-feedback rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 text-center font-semibold"
          style={{ background: 'var(--accent)', color: 'var(--bg)' }}
        >
          <MagnifyingGlass size={22} weight="bold" aria-hidden="true" />
          {t.home.searchNow}
        </Link>
        <Link
          to="/aggiungi"
          className="tap-target press-feedback rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 text-center font-semibold"
          style={{ background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
        >
          <Plus size={22} weight="bold" aria-hidden="true" />
          {t.home.addMeal}
        </Link>
      </div>

      {meals && meals.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-base" style={{ color: 'var(--text)' }}>
            {t.home.weeklyChart}
          </h2>
          <div className="flex items-end gap-4 h-24 rounded-2xl p-4" style={{ background: 'var(--surface)' }}>
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-full rounded-t-md"
                style={{ height: `${(weekCounts.safe / maxWeekCount) * 100}%`, background: 'var(--safe)', minHeight: 4 }}
              />
              <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
                {t.home.weeklyChartSafe} ({weekCounts.safe})
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-full rounded-t-md"
                style={{ height: `${(weekCounts.risk / maxWeekCount) * 100}%`, background: 'var(--high)', minHeight: 4 }}
              />
              <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
                {t.home.weeklyChartRisk} ({weekCounts.risk})
              </span>
            </div>
          </div>
        </section>
      )}

      <section className="flex flex-col gap-2">
        <h2 className="text-base" style={{ color: 'var(--text)' }}>
          {t.home.highRisk}
        </h2>
        {highRisk.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
            {t.home.noRecentHighRisk}
          </p>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {highRisk.map((ing, i) => (
              <div
                key={ing.foodId}
                className="flex items-center justify-between px-3 py-2.5"
                style={i > 0 ? { borderTop: '1px solid var(--surface-3)' } : undefined}
              >
                <span className="text-sm truncate" style={{ color: 'var(--text)' }}>
                  {lang === 'en' && ing.nome_en ? ing.nome_en : ing.nome_it}
                </span>
                <ScoreBadge score={ing.punteggio_istamina} size="sm" />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-base" style={{ color: 'var(--text)' }}>
          {t.home.safe}
        </h2>
        {safe.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
            {t.home.noRecentSafe}
          </p>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {safe.map((ing, i) => (
              <div
                key={ing.foodId}
                className="flex items-center justify-between px-3 py-2.5"
                style={i > 0 ? { borderTop: '1px solid var(--surface-3)' } : undefined}
              >
                <span className="text-sm truncate" style={{ color: 'var(--text)' }}>
                  {lang === 'en' && ing.nome_en ? ing.nome_en : ing.nome_it}
                </span>
                <ScoreBadge score={ing.punteggio_istamina} size="sm" />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
