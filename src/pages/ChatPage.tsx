import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { searchFoods } from '../domain/search'
import { matchOcrText } from '../domain/ocrMatch'
import { foodName } from '../domain/foodName'
import { needsDaosin } from '../data/foods'
import { ScoreBadge } from '../components/ScoreBadge'
import { FlagChips } from '../components/FlagChips'
import { AI_VISION_ENABLED } from '../domain/aiVisionStub'
import type { FoodItem, MealIngredient } from '../types'

type ChatMessage =
  | { id: string; role: 'assistant'; kind: 'text'; text: string }
  | { id: string; role: 'user'; kind: 'text'; text: string }
  | { id: string; role: 'assistant'; kind: 'food-match'; food: FoodItem }
  | { id: string; role: 'assistant'; kind: 'not-found'; query: string }
  | { id: string; role: 'assistant'; kind: 'ocr-results'; foods: FoodItem[] }
  | { id: string; role: 'user'; kind: 'photo'; previewUrl: string }

let uid = 0
function nextId() {
  uid += 1
  return `msg-${uid}`
}

function toIngredient(food: FoodItem): MealIngredient {
  return {
    foodId: food.id,
    nome_it: food.nome_it,
    nome_en: food.nome_en,
    punteggio_istamina: food.punteggio_istamina,
  }
}

export function ChatPage() {
  const { lang, t } = useLanguage()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: 'assistant', kind: 'text', text: t.chat.greeting },
  ])
  const [input, setInput] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [draft, setDraft] = useState<MealIngredient[]>([])
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())

  function pushMessage(msg: ChatMessage) {
    setMessages((prev) => [...prev, msg])
  }

  function handleSend() {
    const query = input.trim()
    if (!query) return
    pushMessage({ id: nextId(), role: 'user', kind: 'text', text: query })
    setInput('')

    const results = searchFoods(query, 1)
    const best = results[0]
    if (best) {
      pushMessage({ id: nextId(), role: 'assistant', kind: 'food-match', food: best })
    } else {
      pushMessage({ id: nextId(), role: 'assistant', kind: 'not-found', query })
    }
  }

  function addToDraft(food: FoodItem) {
    setDraft((prev) => (prev.some((i) => i.foodId === food.id) ? prev : [...prev, toIngredient(food)]))
    setAddedIds((prev) => new Set(prev).add(food.id))
  }

  async function handlePhotoSelected(file: File) {
    const previewUrl = URL.createObjectURL(file)
    pushMessage({ id: nextId(), role: 'user', kind: 'photo', previewUrl })
    setAnalyzing(true)
    try {
      const { createWorker } = await import('tesseract.js')
      const worker = await createWorker('ita')
      const {
        data: { text },
      } = await worker.recognize(file)
      await worker.terminate()

      const matches = matchOcrText(text)
      if (matches.length === 0) {
        pushMessage({ id: nextId(), role: 'assistant', kind: 'text', text: t.chat.ocrNoMatches })
      } else {
        pushMessage({ id: nextId(), role: 'assistant', kind: 'ocr-results', foods: matches })
      }
    } catch {
      pushMessage({ id: nextId(), role: 'assistant', kind: 'text', text: t.chat.ocrNoMatches })
    } finally {
      setAnalyzing(false)
    }
  }

  function goToMeal() {
    navigate('/aggiungi', { state: { draftIngredients: draft } })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            msg={msg}
            lang={lang}
            onAdd={addToDraft}
            addedIds={addedIds}
            addLabel={t.chat.addToMeal}
            addedLabel={t.chat.added}
            notFoundText={t.chat.notFound}
            recommendationLabel={t.chat.recommendation}
            mealNeedsDaosinText={t.chat.mealNeedsDaosin}
            mealSafeText={t.chat.mealSafe}
            foundIngredientsLabel={t.chat.foundIngredients}
          />
        ))}
        {analyzing && (
          <div className="text-sm italic" style={{ color: 'var(--text-faint)' }}>
            {t.chat.analyzing}
          </div>
        )}
      </div>

      {draft.length > 0 && (
        <div
          className="px-4 py-3 flex items-center justify-between gap-3"
          style={{ background: 'var(--accent-soft)', borderTop: '1px solid var(--border)' }}
        >
          <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
            {draft.length} {lang === 'it' ? 'nel pasto' : 'in meal'}
          </span>
          <button
            onClick={goToMeal}
            className="tap-target rounded-full px-4 text-sm font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            {lang === 'it' ? 'Vai al pasto →' : 'Go to meal →'}
          </button>
        </div>
      )}

      <div className="p-3 flex flex-col gap-2" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.chat.inputPlaceholder}
            className="flex-1 rounded-full px-4 py-3 text-base outline-none"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}
          />
          <button
            onClick={handleSend}
            aria-label={t.chat.send}
            className="tap-target rounded-full flex items-center justify-center shrink-0"
            style={{ width: 44, height: 44, background: 'var(--accent)', color: 'var(--bg)' }}
          >
            ➤
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handlePhotoSelected(file)
              e.target.value = ''
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="tap-target flex-1 rounded-xl py-2 text-sm font-medium"
            style={{ background: 'var(--surface-3)', color: 'var(--text)' }}
          >
            📷 {t.chat.uploadPhoto}
          </button>
          <button
            disabled={!AI_VISION_ENABLED}
            title={t.chat.aiButtonDisabled}
            className="tap-target flex-1 rounded-xl py-2 text-xs font-medium disabled:opacity-50"
            style={{ background: 'var(--surface-2)', color: 'var(--text-faint)', border: '1px dashed var(--border)' }}
          >
            {t.chat.aiButtonLabel}
            <br />
            <span style={{ fontSize: 10 }}>{t.chat.aiButtonRequiresKey}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

interface ChatBubbleProps {
  msg: ChatMessage
  lang: 'it' | 'en'
  onAdd: (food: FoodItem) => void
  addedIds: Set<string>
  addLabel: string
  addedLabel: string
  notFoundText: string
  recommendationLabel: string
  mealNeedsDaosinText: string
  mealSafeText: string
  foundIngredientsLabel: string
}

function ChatBubble({
  msg,
  lang,
  onAdd,
  addedIds,
  addLabel,
  addedLabel,
  notFoundText,
  recommendationLabel,
  mealNeedsDaosinText,
  mealSafeText,
  foundIngredientsLabel,
}: ChatBubbleProps) {
  const isUser = msg.role === 'user'
  const align = isUser ? 'items-end' : 'items-start'
  const bubbleStyle = isUser
    ? { background: 'var(--accent-soft)', color: 'var(--text)' }
    : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }

  if (msg.kind === 'text') {
    return (
      <div className={`flex flex-col ${align}`}>
        <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm" style={bubbleStyle}>
          {msg.text}
        </div>
      </div>
    )
  }

  if (msg.kind === 'photo') {
    return (
      <div className={`flex flex-col ${align}`}>
        <img src={msg.previewUrl} alt="" className="max-w-[60%] rounded-2xl" style={{ border: '1px solid var(--border)' }} />
      </div>
    )
  }

  if (msg.kind === 'not-found') {
    return (
      <div className="flex flex-col items-start">
        <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm" style={bubbleStyle}>
          {notFoundText}
        </div>
      </div>
    )
  }

  if (msg.kind === 'food-match') {
    const food = msg.food
    const added = addedIds.has(food.id)
    return (
      <div className="flex flex-col items-start gap-2 max-w-[90%]">
        <div className="rounded-2xl p-4 flex flex-col gap-2 w-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
            {foodName(food, lang)}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <ScoreBadge score={food.punteggio_istamina} incerto={food.punteggio_incerto} size="sm" />
            <FlagChips food={food} />
          </div>
          {food.note_it && (
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {food.note_it}
            </p>
          )}
          <button
            onClick={() => onAdd(food)}
            className="tap-target rounded-lg py-2 text-sm font-semibold mt-1"
            style={{
              background: added ? 'var(--safe-soft)' : 'var(--accent)',
              color: added ? 'var(--safe)' : 'var(--bg)',
            }}
          >
            {added ? `✓ ${addedLabel}` : addLabel}
          </button>
        </div>
      </div>
    )
  }

  // ocr-results
  const scores = msg.foods.map((f) => f.punteggio_istamina)
  const mealDaosin = needsDaosin(scores)
  return (
    <div className="flex flex-col items-start gap-2 max-w-[95%] w-full">
      <div className="rounded-2xl p-4 flex flex-col gap-3 w-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <span className="text-xs font-semibold uppercase" style={{ color: 'var(--text-faint)' }}>
          {foundIngredientsLabel}
        </span>
        {msg.foods.map((food) => {
          const added = addedIds.has(food.id)
          return (
            <div key={food.id} className="flex items-center justify-between gap-2 rounded-xl px-3 py-2" style={{ background: 'var(--surface-2)' }}>
              <div className="min-w-0">
                <div className="text-sm truncate" style={{ color: 'var(--text)' }}>
                  {foodName(food, lang)}
                </div>
                <ScoreBadge score={food.punteggio_istamina} incerto={food.punteggio_incerto} size="sm" />
              </div>
              <button
                onClick={() => onAdd(food)}
                className="tap-target rounded-lg px-3 text-xs font-semibold shrink-0"
                style={{
                  background: added ? 'var(--safe-soft)' : 'var(--accent)',
                  color: added ? 'var(--safe)' : 'var(--bg)',
                }}
              >
                {added ? '✓' : addLabel}
              </button>
            </div>
          )
        })}
        <div
          className="rounded-xl p-3 text-sm font-medium"
          style={{
            background: mealDaosin ? 'var(--high-soft)' : 'var(--safe-soft)',
            color: mealDaosin ? 'var(--high)' : 'var(--safe)',
          }}
        >
          <span className="block text-xs uppercase mb-1" style={{ opacity: 0.8 }}>
            {recommendationLabel}
          </span>
          {mealDaosin ? mealNeedsDaosinText : mealSafeText}
        </div>
      </div>
    </div>
  )
}
