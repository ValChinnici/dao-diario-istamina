import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { BottomNav } from './components/BottomNav'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'
import { LogPage } from './pages/LogPage'
import { HistoryPage } from './pages/HistoryPage'
import { InfoPage } from './pages/InfoPage'

function App() {
  return (
    <div className="flex flex-col" style={{ height: '100dvh' }}>
      <Header />
      <main className="flex-1 min-h-0 overflow-y-auto" style={{ background: 'var(--bg)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ricerca" element={<SearchPage />} />
          <Route path="/aggiungi" element={<LogPage />} />
          <Route path="/aggiungi/:id" element={<LogPage />} />
          <Route path="/storico" element={<HistoryPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default App
