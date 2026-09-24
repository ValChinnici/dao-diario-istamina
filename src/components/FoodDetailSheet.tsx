import { useLanguage } from '../i18n/LanguageContext'
import { foodName } from '../domain/foodName'
import { ScoreBadge } from './ScoreBadge'
import { FlagChips } from './FlagChips'
import type { FoodItem } from '../types'

interface FoodDetailSheetProps {
  food: FoodItem
  onClose: () => void
  footer?: React.ReactNode
}

export function FoodDetailSheet({ food, onClose, footer }: FoodDetailSheetProps) {
  const { lang, t } = useLanguage()
  const needsDaosin = food.punteggio_istamina === 2 || food.punteggio_istamina === 3

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl" style={{ color: 'var(--text)' }}>
              {foodName(food, lang)}
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
              {food.categoria}
              {food.sottocategoria ? ` · ${food.sottocategoria}` : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t.common.close}
            className="tap-target rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'var(--surface-3)', color: 'var(--text-muted)' }}
          >
            ✕
          </button>
        </div>

        <ScoreBadge score={food.punteggio_istamina} incerto={food.punteggio_incerto} />

        {needsDaosin && (
          <div
            className="rounded-xl p-3 text-sm font-medium"
            style={{ background: 'var(--high-soft)', color: 'var(--high)' }}
          >
            {t.search.daosinWarning}
          </div>
        )}

        <FlagChips food={food} />

        {food.note_it && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {food.note_it}
          </p>
        )}

        {footer}
      </div>
    </div>
  )
}
