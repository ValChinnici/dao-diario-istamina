import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { mealMaxScore, needsDaosin } from '../data/foods'
import { db } from '../db'
import { FoodPicker } from '../components/FoodPicker'
import { ScoreBadge } from '../components/ScoreBadge'
import { SYMPTOM_KEYS } from '../types'
import type { FoodItem, MealIngredient, SymptomEntry, SymptomKey } from '../types'

function toLocalDateTimeInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function symptomsToRecord(list: SymptomEntry[]): Record<SymptomKey, SymptomEntry | undefined> {
  const record = {} as Record<SymptomKey, SymptomEntry | undefined>
  for (const s of list) record[s.key] = s
  return record
}

export function LogPage() {
  const { lang, t } = useLanguage()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const editId = id ? Number(id) : undefined
  const location = useLocation()
  const draftFromChat = (location.state as { draftIngredients?: MealIngredient[] } | null)?.draftIngredients

  const [dateTime, setDateTime] = useState(() => toLocalDateTimeInputValue(new Date()))
  const [ingredients, setIngredients] = useState<MealIngredient[]>(() => (!editId && draftFromChat ? draftFromChat : []))
  const [daosinPreso, setDaosinPreso] = useState(false)
  const [symptoms, setSymptoms] = useState<Record<SymptomKey, SymptomEntry | undefined>>(
    {} as Record<SymptomKey, SymptomEntry | undefined>,
  )
  const [otherNote, setOtherNote] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!editId) return
    db.meals.get(editId).then((meal) => {
      if (!meal) return
      setDateTime(toLocalDateTimeInputValue(new Date(meal.timestamp)))
      setIngredients(meal.ingredienti)
      setDaosinPreso(meal.daosin_preso)
      setSymptoms(symptomsToRecord(meal.sintomi))
      const altro = meal.sintomi.find((s) => s.key === 'altro')
      if (altro?.nota) setOtherNote(altro.nota)
    })
  }, [editId])

  const scores = useMemo(() => ingredients.map((i) => i.punteggio_istamina), [ingredients])
  const mealScore = useMemo(() => mealMaxScore(scores), [scores])
  const mealNeedsDaosin = useMemo(() => needsDaosin(scores), [scores])

  function addIngredient(food: FoodItem) {
    if (ingredients.some((i) => i.foodId === food.id)) return
    setIngredients((prev) => [
      ...prev,
      {
        foodId: food.id,
        nome_it: food.nome_it,
        nome_en: food.nome_en,
        punteggio_istamina: food.punteggio_istamina,
      },
    ])
  }

  function removeIngredient(foodId: string) {
    setIngredients((prev) => prev.filter((i) => i.foodId !== foodId))
  }

  function toggleSymptom(key: SymptomKey) {
    setSymptoms((prev) => {
      const next = { ...prev }
      if (next[key]) {
        delete next[key]
      } else {
        next[key] = { key, intensita: 2 }
      }
      return next
    })
  }

  function setSymptomIntensity(key: SymptomKey, intensita: 1 | 2 | 3) {
    setSymptoms((prev) => ({ ...prev, [key]: { ...(prev[key] as SymptomEntry), intensita } }))
  }

  async function handleSave() {
    if (ingredients.length === 0) {
      setError(t.logForm.addAtLeastOne)
      return
    }
    setError('')

    const sintomiList = Object.values(symptoms).filter((s): s is SymptomEntry => Boolean(s))
    if (symptoms.altro && otherNote.trim()) {
      const altro = sintomiList.find((s) => s.key === 'altro')
      if (altro) altro.nota = otherNote.trim()
    }

    const payload = {
      timestamp: new Date(dateTime).getTime(),
      ingredienti: ingredients,
      punteggio_massimo: mealScore,
      daosin_preso: daosinPreso,
      sintomi: sintomiList,
    }

    if (editId) {
      await db.meals.update(editId, payload)
    } else {
      await db.meals.add(payload)
    }

    setSaved(true)
    setTimeout(() => navigate('/storico'), 700)
  }

  return (
    <div className="p-4 flex flex-col gap-5 pb-8">
      <h1 className="text-xl">{editId ? t.logForm.editTitle : t.logForm.title}</h1>

      <label className="flex flex-col gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
        {t.logForm.dateTime}
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="rounded-xl px-4 py-3 text-base outline-none"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t.logForm.searchFood}
        </span>
        <FoodPicker placeholder={t.search.placeholder} onPick={addIngredient} />
      </div>

      {ingredients.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t.logForm.ingredients}
          </span>
          {ingredients.map((ing) => (
            <div
              key={ing.foodId}
              className="flex items-center justify-between gap-2 rounded-xl px-3 py-2"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
            >
              <span className="truncate text-sm" style={{ color: 'var(--text)' }}>
                {lang === 'en' && ing.nome_en ? ing.nome_en : ing.nome_it}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <ScoreBadge score={ing.punteggio_istamina} size="sm" />
                <button
                  onClick={() => removeIngredient(ing.foodId)}
                  aria-label={t.logForm.remove}
                  className="tap-target rounded-full flex items-center justify-center"
                  style={{ color: 'var(--text-faint)' }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: 'var(--surface-3)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              {t.logForm.mealScore}
            </span>
            <ScoreBadge score={mealScore} />
          </div>
        </div>
      )}

      {mealNeedsDaosin && (
        <div className="rounded-xl p-3 text-sm font-medium" style={{ background: 'var(--high-soft)', color: 'var(--high)' }}>
          {lang === 'it' ? 'Prendi Daosin, un ingrediente è a rischio alto o medio.' : 'Take Daosin, one ingredient is medium or high risk.'}
        </div>
      )}

      <label
        className="tap-target flex items-center justify-between rounded-xl px-4 py-3"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <span className="text-sm" style={{ color: 'var(--text)' }}>
          {t.logForm.daosinLabel}
        </span>
        <input
          type="checkbox"
          checked={daosinPreso}
          onChange={(e) => setDaosinPreso(e.target.checked)}
          className="w-5 h-5"
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t.logForm.symptomsTitle}
        </span>
        <div className="flex flex-col gap-2">
          {SYMPTOM_KEYS.map((key) => {
            const active = Boolean(symptoms[key])
            return (
              <div
                key={key}
                className="rounded-xl px-3 py-2"
                style={{ background: active ? 'var(--warn-soft)' : 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <button
                  onClick={() => toggleSymptom(key)}
                  className="tap-target w-full flex items-center justify-between text-sm"
                  style={{ color: active ? 'var(--warn)' : 'var(--text)' }}
                >
                  {t.symptoms[key]}
                  <span aria-hidden="true">{active ? '✓' : ''}</span>
                </button>
                {active && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
                      {t.logForm.intensity}
                    </span>
                    {[1, 2, 3].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSymptomIntensity(key, level as 1 | 2 | 3)}
                        className="tap-target rounded-full flex items-center justify-center text-xs font-semibold"
                        style={{
                          width: 32,
                          height: 32,
                          background: symptoms[key]?.intensita === level ? 'var(--warn)' : 'var(--surface-3)',
                          color: symptoms[key]?.intensita === level ? 'var(--bg)' : 'var(--text-muted)',
                        }}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                )}
                {key === 'altro' && active && (
                  <input
                    value={otherNote}
                    onChange={(e) => setOtherNote(e.target.value)}
                    placeholder={t.logForm.otherSymptomPlaceholder}
                    className="w-full mt-2 rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {error && (
        <p className="text-sm" style={{ color: 'var(--high)' }}>
          {error}
        </p>
      )}

      {saved && (
        <p className="text-sm" style={{ color: 'var(--safe)' }}>
          {t.logForm.saved}
        </p>
      )}

      <button
        onClick={handleSave}
        className="tap-target rounded-xl py-3 font-semibold text-base"
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      >
        {t.logForm.save}
      </button>
    </div>
  )
}
