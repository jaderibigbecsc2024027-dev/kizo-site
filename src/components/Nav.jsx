import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/kizo-logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/lore', label: 'Lore' },
  { to: '/collection', label: 'Collection' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/shrine', label: 'Shrine' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `font-mono text-xs uppercase tracking-widest transition-colors ${
      isActive ? 'text-ink' : 'text-stone hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="container-kizo flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="KIZO" className="h-8 w-8 rounded-sm" />
          <span className="font-display text-xl tracking-wide">KIZO</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/whitelist" className="hidden md:inline-flex btn-primary !py-3 !px-5 text-xs">
          Join WL
        </NavLink>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-paper">
          <div className="container-kizo flex flex-col gap-4 py-5">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/whitelist" className="btn-primary w-fit" onClick={() => setOpen(false)}>
              Join WL
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
