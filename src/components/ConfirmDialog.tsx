import { useLanguage } from '../i18n/LanguageContext'

interface ConfirmDialogProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

/**
 * Replaces window.confirm(), which iOS silently no-ops (auto-dismisses without showing anything)
 * for web apps launched from the home screen, making native-confirm delete flows unusable there.
 */
export function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  const { t } = useLanguage()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-5 flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm" style={{ color: 'var(--text)' }}>
          {message}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="tap-target flex-1 rounded-xl py-2.5 text-sm font-medium"
            style={{ background: 'var(--surface-3)', color: 'var(--text)' }}
          >
            {t.common.no}
          </button>
          <button
            onClick={onConfirm}
            className="tap-target flex-1 rounded-xl py-2.5 text-sm font-semibold"
            style={{ background: 'var(--surface-3)', color: 'var(--text)', border: '1px solid var(--high)' }}
          >
            {t.common.yes}
          </button>
        </div>
      </div>
    </div>
  )
}
