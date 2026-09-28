import { NavLink } from 'react-router-dom'
import { House, MagnifyingGlass, Plus, ClockCounterClockwise } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext'

const items = [
  { to: '/', key: 'home' as const, Icon: House, end: true },
  { to: '/ricerca', key: 'search' as const, Icon: MagnifyingGlass, end: false },
  { to: '/aggiungi', key: 'log' as const, Icon: Plus, end: false },
  { to: '/storico', key: 'history' as const, Icon: ClockCounterClockwise, end: false },
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
      {items.map(({ to, key, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className="tap-target flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] transition-colors duration-200"
          style={({ isActive }) => ({
            color: isActive ? 'var(--accent)' : 'var(--text-faint)',
          })}
        >
          {({ isActive }) => (
            <>
              <Icon size={20} weight={isActive ? 'fill' : 'light'} />
              {t.nav[key]}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
