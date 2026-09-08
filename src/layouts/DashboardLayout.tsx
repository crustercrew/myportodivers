import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import TerminalEntryScreen from '../components/ui/TerminalEntryScreen'

/**
 * Shared page shell: Terminal Entry Screen (HD2 Stratagem sequence),
 * scanline overlay, Header, Footer, and `<main>` slot for pages.
 */
export default function DashboardLayout() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hd2_terminal_unlocked') === 'true'
    }
    return false
  })

  const handleUnlock = () => {
    setIsUnlocked(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hd2_terminal_unlocked', 'true')
    }
  }

  const handleLock = () => {
    setIsUnlocked(false)
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('hd2_terminal_unlocked')
    }
  }

  return (
    <div className="flex flex-col min-h-screen lg:h-screen p-2 select-none">
      {!isUnlocked && <TerminalEntryScreen onUnlock={handleUnlock} />}
      <div className="scanline"></div>

      <Header />

      <main className="flex flex-col lg:flex-row flex-1 gap-2 overflow-auto lg:overflow-hidden">
        <Outlet />
      </main>

      <Footer onLock={handleLock} />
    </div>
  )
}
