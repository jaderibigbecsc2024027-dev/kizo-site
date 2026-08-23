import { Link } from 'react-router-dom'
import ToriiDivider from '../components/ToriiDivider.jsx'

const steps = ['Stake your KIZO', 'Accumulate Spirit Energy', 'Earn $KIZO', 'Awaken the Shrine']

export default function Shrine() {
  return (
    <div>
      <section className="container-kizo pt-16 pb-8 md:pt-24 text-center max-w-2xl mx-auto">
        <span className="inline-block font-mono text-xs uppercase tracking-widest bg-shrine text-paper px-3 py-1.5 mb-6">
          Coming soon
        </span>
        <h1 className="font-display text-5xl sm:text-6xl mb-6">THE SHRINE</h1>
        <p className="text-stone text-lg">
          The gateway to KIZO utility. Lock your spirit within the Shrine, let it
          accumulate Spirit Energy, and earn $KIZO in return.
        </p>
      </section>

      <ToriiDivider />

      <section className="container-kizo py-8 md:py-16 max-w-2xl mx-auto">
        <ol className="grid grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {steps.map((s, i) => (
            <li key={s} className="bg-paper p-6">
              <span className="font-mono text-xs text-stone">{String(i + 1).padStart(2, '0')}</span>
              <p className="font-display text-lg mt-2">{s}</p>
            </li>
          ))}
        </ol>

        <p className="text-stone text-sm mt-8">
          Exact staking mechanics, reward rates and emission schedule will be
          announced when the system is ready — built to be sustainable rather than
          promised before the economics are tested.
        </p>
      </section>

      <section className="bg-ink text-paper">
        <div className="container-kizo py-16 text-center">
          <p className="eyebrow text-stone mb-4">Be first to know</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-6">
            Join the whitelist to hear when the Shrine opens.
          </h2>
          <Link to="/whitelist" className="inline-flex items-center justify-center gap-2 bg-lime text-ink font-mono uppercase tracking-widest text-sm px-8 py-4 hover:-translate-y-0.5 transition-transform">
            Join the Whitelist
          </Link>
        </div>
      </section>
    </div>
  )
}
