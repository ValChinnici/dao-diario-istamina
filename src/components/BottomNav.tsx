import { NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

const items = [
  { to: '/', key: 'home' as const, icon: '⌂' },
  { to: '/ricerca', key: 'search' as const, icon: '⌕' },
  { to: '/chat', key: 'chat' as const, icon: '💬' },
  { to: '/aggiungi', key: 'log' as const, icon: '+' },
  { to: '/storico', key: 'history' as const, icon: '☰' },
]

export function BottomNav() {
  const { t } = useLanguage()

  return (
    <nav
      className="sticky bottom-0 z-40 flex items-stretch justify-around"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className="tap-target flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px]"
          style={({ isActive }) => ({
            color: isActive ? 'var(--accent)' : 'var(--text-faint)',
          })}
        >
          <span aria-hidden="true" style={{ fontSize: 18 }}>
            {item.icon}
          </span>
          {t.nav[item.key]}
        </NavLink>
      ))}
    </nav>
  )
}
