import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Lore from './pages/Lore.jsx'
import Collection from './pages/Collection.jsx'
import Roadmap from './pages/Roadmap.jsx'
import Shrine from './pages/Shrine.jsx'
import Whitelist from './pages/Whitelist.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/shrine" element={<Shrine />} />
          <Route path="/whitelist" element={<Whitelist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
