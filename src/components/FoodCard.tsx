import { useLanguage } from '../i18n/LanguageContext'
import { foodName, foodNote } from '../domain/foodName'
import { ScoreBadge } from './ScoreBadge'
import { FlagChips } from './FlagChips'
import type { FoodItem } from '../types'

interface FoodCardProps {
  food: FoodItem
  onClick?: () => void
  action?: React.ReactNode
}

export function FoodCard({ food, onClick, action }: FoodCardProps) {
  const { lang } = useLanguage()

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      className="w-full text-left rounded-2xl p-4 flex flex-col gap-2 transition-colors press-feedback"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-semibold truncate" style={{ color: 'var(--text)' }}>
            {foodName(food, lang)}
          </div>
          <div className="text-xs truncate" style={{ color: 'var(--text-faint)' }}>
            {food.categoria}
            {food.sottocategoria ? ` · ${food.sottocategoria}` : ''}
          </div>
        </div>
        {action}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <ScoreBadge score={food.punteggio_istamina} incerto={food.punteggio_incerto} size="sm" />
        <FlagChips food={food} />
      </div>
      {foodNote(food, lang) && (
        <p className="text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>
          {foodNote(food, lang)}
        </p>
      )}
    </div>
  )
}
