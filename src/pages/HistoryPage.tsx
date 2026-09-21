import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { db } from '../db'
import { ScoreBadge } from '../components/ScoreBadge'
import type { MealLogEntry } from '../types'

type ScoreFilter = '' | 0 | 1 | 2 | 3

function formatDateTime(ts: number, lang: 'it' | 'en'): string {
  return new Date(ts).toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function HistoryPage() {
  const { lang, t } = useLanguage()
  const navigate = useNavigate()
  const [dateFilter, setDateFilter] = useState('')
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>('')

  const meals = useLiveQuery(() => db.meals.orderBy('timestamp').reverse().toArray(), [])

  const filtered = useMemo(() => {
    if (!meals) return []
    return meals.filter((m) => {
      if (dateFilter) {
        const d = new Date(m.timestamp)
        const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        if (dStr !== dateFilter) return false
      }
      if (scoreFilter !== '' && m.punteggio_massimo !== scoreFilter) return false
      return true
    })
  }, [meals, dateFilter, scoreFilter])

  async function handleDelete(m: MealLogEntry) {
    if (!m.id) return
    if (!window.confirm(t.history.confirmDelete)) return
    await db.meals.delete(m.id)
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl">{t.history.title}</h1>

      <div className="flex gap-2">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="flex-1 rounded-xl px-3 py-2 text-sm outline-none tap-target"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        />
        <select
          value={scoreFilter}
          onChange={(e) => setScoreFilter(e.target.value === '' ? '' : (Number(e.target.value) as 0 | 1 | 2 | 3))}
          className="rounded-xl px-3 py-2 text-sm tap-target"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        >
          <option value="">{t.history.all}</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((meal) => (
          <div
            key={meal.id}
            className="rounded-2xl p-4 flex flex-col gap-2"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {formatDateTime(meal.timestamp, lang)}
              </span>
              <ScoreBadge score={meal.punteggio_massimo} size="sm" />
            </div>

            <p className="text-sm" style={{ color: 'var(--text)' }}>
              {meal.ingredienti.map((i) => (lang === 'en' && i.nome_en ? i.nome_en : i.nome_it)).join(', ')}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs rounded-full px-2 py-1"
                style={{
                  background: meal.daosin_preso ? 'var(--safe-soft)' : 'var(--surface-3)',
                  color: meal.daosin_preso ? 'var(--safe)' : 'var(--text-faint)',
                }}
              >
                {meal.daosin_preso ? t.history.daosinTaken : t.history.daosinNotTaken}
              </span>
              {meal.sintomi.map((s) => (
                <span
                  key={s.key}
                  className="text-xs rounded-full px-2 py-1"
                  style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}
                >
                  {t.symptoms[s.key]} · {s.intensita}
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-1">
              <button
                onClick={() => navigate(`/aggiungi/${meal.id}`)}
                className="tap-target flex-1 rounded-lg text-sm font-medium"
                style={{ background: 'var(--surface-3)', color: 'var(--text)' }}
              >
                {t.history.edit}
              </button>
              <button
                onClick={() => handleDelete(meal)}
                className="tap-target flex-1 rounded-lg text-sm font-medium"
                style={{ background: 'var(--high-soft)', color: 'var(--high)' }}
              >
                {t.history.delete}
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm py-8 text-center" style={{ color: 'var(--text-faint)' }}>
            {t.history.empty}
          </p>
        )}
      </div>
    </div>
  )
}
