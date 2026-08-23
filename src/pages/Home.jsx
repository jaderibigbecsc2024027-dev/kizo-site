import { Link } from 'react-router-dom'
import ToriiDivider from '../components/ToriiDivider.jsx'
import character01 from '../assets/kizo-character-01.jpg'

const teasers = [
  {
    to: '/lore',
    label: 'Lore',
    title: 'The Shrines were not ordinary places.',
    copy: 'Long silent, the ancient Shrines are stirring again — and so are the spirits bound to them.',
  },
  {
    to: '/collection',
    label: 'Collection',
    title: '3,333 spirits. No two alike.',
    copy: 'A first look at the characters awakening across the KIZO world.',
  },
  {
    to: '/roadmap',
    label: 'Roadmap',
    title: 'Built step by step.',
    copy: 'From the first mint to the Shrine — where we\u2019re headed, in four phases.',
  },
  {
    to: '/shrine',
    label: 'Shrine',
    title: 'Stake. Awaken. Earn.',
    copy: 'The staking Shrine is dormant for now. Here\u2019s what it\u2019s becoming.',
  },
]

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="container-kizo grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
          <div className="order-2 md:order-1">
            <p className="eyebrow mb-5">Anime-native collectible ecosystem</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6">
              AWAKEN<br />YOUR<br /><span className="text-shrine">SPIRIT</span>
            </h1>
            <p className="text-stone text-lg max-w-md mb-10">
              KIZO is a world of anime spirits, ancient Shrines, and spiritual energy —
              built on Robinhood Chain. The mint is the beginning, not the destination.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/whitelist" className="btn-primary">Join the Whitelist</Link>
              <Link to="/lore" className="btn-secondary">Read the Lore</Link>
            </div>

            <dl className="grid grid-cols-3 gap-6 max-w-md font-mono">
              <div>
                <dt className="text-xs text-stone uppercase tracking-widest mb-1">Supply</dt>
                <dd className="text-2xl">3,333</dd>
              </div>
              <div>
                <dt className="text-xs text-stone uppercase tracking-widest mb-1">Mint</dt>
                <dd className="text-2xl">0.0004Ξ</dd>
              </div>
              <div>
                <dt className="text-xs text-stone uppercase tracking-widest mb-1">Chain</dt>
                <dd className="text-2xl">RBH</dd>
              </div>
            </dl>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="absolute -inset-4 bg-lime/20 -z-10 hidden md:block" />
            <img
              src={character01}
              alt="A KIZO spirit in an oni mask and beret, katana resting on his shoulder"
              className="w-full h-auto shadow-[10px_10px_0_0_rgba(22,22,15,0.1)]"
            />
          </div>
        </div>
      </section>

      <ToriiDivider />

      {/* SHORT WORLD INTRO */}
      <section className="container-kizo py-8 md:py-16 text-center max-w-2xl mx-auto">
        <p className="eyebrow mb-5">The world of KIZO</p>
        <p className="text-2xl sm:text-3xl font-display leading-tight mb-6">
          Every spirit has a story. The Shrines are dormant. The spirits are waiting.
        </p>
        <p className="text-stone">
          Collect a KIZO. Enter the Shrine. Awaken its spirit — and become part of a world
          that keeps expanding long after mint day.
        </p>
      </section>

      <ToriiDivider />

      {/* TEASER GRID */}
      <section className="container-kizo py-8 md:py-16">
        <div className="grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {teasers.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group bg-paper p-8 md:p-10 flex flex-col justify-between min-h-[220px] hover:bg-ink transition-colors duration-200"
            >
              <div>
                <p className="eyebrow mb-4 group-hover:text-lime transition-colors">{t.label}</p>
                <h3 className="font-display text-2xl mb-3 group-hover:text-paper transition-colors">
                  {t.title}
                </h3>
                <p className="text-stone text-sm group-hover:text-paper/60 transition-colors">
                  {t.copy}
                </p>
              </div>
              <span className="mt-6 font-mono text-xs uppercase tracking-widest group-hover:text-lime transition-colors">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* WL BANNER */}
      <section className="bg-ink text-paper">
        <div className="container-kizo py-16 md:py-20 text-center">
          <p className="eyebrow text-stone mb-4">Whitelist now open</p>
          <h2 className="font-display text-4xl sm:text-5xl mb-6">
            Get on the list before the Shrine opens.
          </h2>
          <Link to="/whitelist" className="inline-flex items-center justify-center gap-2 bg-lime text-ink font-mono uppercase tracking-widest text-sm px-8 py-4 hover:-translate-y-0.5 transition-transform">
            Join the Whitelist
          </Link>
        </div>
      </section>
    </div>
  )
}
