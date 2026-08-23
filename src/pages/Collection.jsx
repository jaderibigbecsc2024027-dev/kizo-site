import { useEffect, useState } from 'react'
import ToriiDivider from '../components/ToriiDivider.jsx'
import character01 from '../assets/kizo-character-01.jpg'
import { supabase } from '../lib/supabase.js'

// Used until Supabase is configured/reachable, or if its table is empty —
// the site should never show a broken page just because the backend isn't
// set up yet. Manage the real data from Supabase (Table Editor) instead of
// editing this array once collection_spirits is live.
// Shows a soft pulsing placeholder in place of the image until it has
// actually finished downloading, then fades the real image in — instead of
// a hard block of color that abruptly gets replaced once the file arrives.
function RevealImage({ src, alt, fetchPriority, loading: loadingAttr }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="absolute inset-0">
      {!loaded && <div className="absolute inset-0 bg-stone/25 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        fetchPriority={fetchPriority}
        loading={loadingAttr}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

const fallbackSpirits = [
  { id: '01', name: 'Spirit 01', revealed: true, image_url: character01 },
  ...Array.from({ length: 11 }, (_, i) => ({
    id: String(i + 2).padStart(2, '0'),
    name: `Spirit ${String(i + 2).padStart(2, '0')}`,
    revealed: false,
    image_url: null,
  })),
]

export default function Collection() {
  // If Supabase is configured, wait for the real data before showing
  // anything revealed — otherwise the bundled placeholder flashes on screen
  // first and then gets swapped for the real image, which reads as a bug.
  // Without Supabase configured, there's nothing to wait for, so skip
  // straight to the fallback.
  const [spirits, setSpirits] = useState(supabase ? [] : fallbackSpirits)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return
    let cancelled = false

    async function load() {
      const { data, error } = await supabase
        .from('collection_spirits')
        .select('slot_order, name, revealed, image_url')
        .order('slot_order', { ascending: true })

      if (cancelled) return

      if (error || !data || data.length === 0) {
        if (error) console.warn('collection_spirits fetch failed, using fallback:', error.message)
        setSpirits(fallbackSpirits)
        setLoading(false)
        return
      }

      setSpirits(
        data.map((row) => ({
          id: String(row.slot_order).padStart(2, '0'),
          name: row.name,
          revealed: row.revealed,
          image_url: row.image_url,
        }))
      )
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const [featured, ...rest] = spirits

  return (
    <div>
      <section className="container-kizo pt-16 pb-8 md:pt-24 text-center max-w-2xl mx-auto">
        <p className="eyebrow mb-5">3,333 spirits</p>
        <h1 className="font-display text-5xl sm:text-6xl mb-6">COLLECTION</h1>
        <p className="text-stone text-lg">
          A first look at spirits awakening within the KIZO world. The rest
          remain sealed until reveal.
        </p>
      </section>

      <ToriiDivider />

      <section className="container-kizo py-8 md:py-16">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="col-span-2 sm:col-span-3 lg:col-span-2 lg:row-span-2 flex flex-col">
              <div className="flex-1 bg-ink/10 animate-pulse min-h-[240px]" />
              <div className="h-3 w-24 bg-ink/10 animate-pulse mt-3" />
            </div>
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-square bg-ink/10 animate-pulse" />
                <div className="h-3 w-16 bg-ink/10 animate-pulse mt-3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {featured && (
              <div className="col-span-2 sm:col-span-3 lg:col-span-2 lg:row-span-2 flex flex-col">
                <div className="flex-1 bg-charcoal overflow-hidden min-h-[240px] flex items-center justify-center relative">
                  {featured.revealed && featured.image_url ? (
                    <RevealImage
                      src={featured.image_url}
                      alt={`KIZO sneak peek — ${featured.name}, revealed`}
                      fetchPriority="high"
                      loading="eager"
                    />
                  ) : (
                    <span className="font-display text-lime/70 text-3xl">?</span>
                  )}
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-stone mt-3">
                  {featured.id} — {featured.revealed ? 'Revealed' : 'Sealed'}
                </p>
              </div>
            )}

            {rest.map((s) => (
              <div key={s.id} className="flex flex-col">
                <div className="aspect-square bg-ink flex items-center justify-center relative overflow-hidden">
                  {s.revealed && s.image_url ? (
                    <RevealImage src={s.image_url} alt="" loading="lazy" />
                  ) : (
                    <>
                      <span className="font-display text-lime/70 text-3xl">?</span>
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(45deg, #D6FA2B 0, #D6FA2B 1px, transparent 1px, transparent 12px)',
                        }}
                      />
                    </>
                  )}
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-stone mt-3">
                  {s.id} — {s.revealed ? 'Revealed' : 'Sealed'}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="text-stone text-sm mt-10 max-w-lg">
          Traits, affinities and full character reveals arrive closer to mint —
          each KIZO carries its own connection to a Shrine, discovered only once
          it awakens.
        </p>
      </section>
    </div>
  )
}
