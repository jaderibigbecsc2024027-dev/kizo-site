import { Link } from 'react-router-dom'
import logo from '../assets/kizo-logo.png'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-paper/80 mt-32">
      <div className="container-kizo py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="KIZO" className="h-9 w-9 rounded-sm" />
          <div>
            <p className="font-display text-lg text-paper tracking-wide">KIZO</p>
            <p className="text-xs text-paper/50 font-mono">Awaken your spirit.</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono uppercase tracking-wider">
          <Link to="/lore" className="hover:text-lime transition-colors">Lore</Link>
          <Link to="/collection" className="hover:text-lime transition-colors">Collection</Link>
          <Link to="/roadmap" className="hover:text-lime transition-colors">Roadmap</Link>
          <Link to="/shrine" className="hover:text-lime transition-colors">Shrine</Link>
          <Link to="/whitelist" className="hover:text-lime transition-colors">Whitelist</Link>
        </nav>

        <a
          href="https://x.com/kizohood"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono uppercase tracking-wider hover:text-lime transition-colors"
        >
          @kizohood ↗
        </a>
      </div>
      <div className="border-t border-paper/10">
        <div className="container-kizo py-5 text-xs font-mono text-paper/40">
          © {new Date().getFullYear()} KIZO. Built on Robinhood Chain.
        </div>
      </div>
    </footer>
  )
}
