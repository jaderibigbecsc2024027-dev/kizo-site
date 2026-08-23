import ToriiDivider from '../components/ToriiDivider.jsx'

const phases = [
  {
    n: 'I',
    name: 'Awaken',
    body: 'Reveal, community launch, and mint — introducing the world of KIZO.',
  },
  {
    n: 'II',
    name: 'The Shrine',
    body: 'Holder portal and staking go live, alongside the first $KIZO utility.',
  },
  {
    n: 'III',
    name: 'Spirit Awakening',
    body: 'Shrine levels, trait affinities, and holder quests expand the ecosystem.',
  },
  {
    n: 'IV',
    name: 'The Awakened',
    body: 'New Shrines, new characters, and new experiences carry KIZO forward.',
  },
]

export default function Roadmap() {
  return (
    <div>
      <section className="container-kizo pt-16 pb-8 md:pt-24 text-center max-w-2xl mx-auto">
        <p className="eyebrow mb-5">Built step by step</p>
        <h1 className="font-display text-5xl sm:text-6xl mb-6">ROADMAP</h1>
        <p className="text-stone text-lg">
          We're not promising everything on day one. Four phases, each one earning the next.
        </p>
      </section>

      <ToriiDivider />

      <section className="container-kizo py-8 md:py-16 max-w-3xl mx-auto">
        <ol className="divide-y divide-ink/10 border-y border-ink/10">
          {phases.map((p) => (
            <li key={p.n} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-8">
              <span className="font-display text-shrine text-3xl w-16 shrink-0">{p.n}</span>
              <div>
                <h2 className="font-display text-2xl mb-2">{p.name}</h2>
                <p className="text-stone">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
