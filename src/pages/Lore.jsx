import ToriiDivider from '../components/ToriiDivider.jsx'

const chapters = [
  {
    title: 'The Shrines',
    body: `Long before the world knew of them, there were ancient places hidden between
    the physical and spiritual realms. They were known as the Shrines — not ordinary
    places of worship, but sources of a mysterious energy: Spirit Energy. For centuries
    the Shrines stood silent. Their energy faded, and the connection between the two
    realms began to weaken.`,
  },
  {
    title: 'The Spirits Return',
    body: `Then something changed. Spirits began appearing once again — some born from
    forgotten memories, some emerging from ancient bloodlines, others with no explanation
    at all. These beings became known as KIZO: neither fully human nor fully spirit,
    each carrying the ability to interact with Spirit Energy, and each connected to a
    Shrine of its own.`,
  },
  {
    title: 'The Awakening',
    body: `Every KIZO carries dormant spiritual energy — but it cannot awaken alone. It
    needs a connection. The Shrines provide that connection: when a KIZO enters a Shrine,
    its energy begins to grow, and the longer the bond holds, the stronger it becomes.
    Collect a KIZO. Enter the Shrine. Awaken its spirit.`,
  },
  {
    title: 'The Shrines Awaken',
    body: `As more KIZO awaken, the ancient Shrines begin to awaken with them. Different
    Shrines hold different kinds of power — Ember, Moonwater, Shadow, Storm, Sakura —
    each representing a different form of Spirit Energy, with its own quests, lore, and
    identity still waiting to be discovered.`,
  },
]

export default function Lore() {
  return (
    <div>
      <section className="container-kizo pt-16 pb-8 md:pt-24 text-center max-w-2xl mx-auto">
        <p className="eyebrow mb-5">The world</p>
        <h1 className="font-display text-5xl sm:text-6xl mb-6">LORE</h1>
        <p className="text-stone text-lg">
          The story behind the Shrines, the spirits, and the awakening that brought
          KIZO into being.
        </p>
      </section>

      <ToriiDivider />

      <section className="container-kizo py-8 md:py-16 max-w-3xl mx-auto space-y-16">
        {chapters.map((c, i) => (
          <article key={c.title}>
            <p className="eyebrow mb-3">Chapter {i + 1}</p>
            <h2 className="font-display text-3xl sm:text-4xl mb-5">{c.title}</h2>
            <p className="text-ink/80 leading-relaxed whitespace-pre-line">{c.body}</p>
          </article>
        ))}
      </section>

      <ToriiDivider />

      <section className="container-kizo pb-20 text-center max-w-xl mx-auto">
        <p className="font-display text-2xl sm:text-3xl leading-snug">
          "We are not trying to promise everything on day one. The awakening begins
          with KIZO."
        </p>
      </section>
    </div>
  )
}
