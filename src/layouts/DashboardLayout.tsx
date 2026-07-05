import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

/**
 * Shared page shell: scanline overlay, Header, Footer, and a `<main>` slot
 * for whatever page is active. Add more routes under this layout in
 * App.tsx and they'll automatically get the same header/footer chrome.
 */
export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen p-2 select-none">
      <div className="scanline"></div>

      <Header />

      <main className="flex flex-1 gap-2 overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
