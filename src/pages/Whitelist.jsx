import { useState } from 'react'
import ToriiDivider from '../components/ToriiDivider.jsx'
import { supabase } from '../lib/supabase.js'

const KIZO_PROFILE_URL = 'https://x.com/kizohood'
// Point this at the exact pinned/announcement post once you have it — right
// now it reuses the profile link as a placeholder.
const KIZO_POST_URL = 'https://x.com/kizohood/status/2091816619718627495?s=20'

function isLikelyWallet(v) {
  return /^0x[a-fA-F0-9]{40}$/.test(v.trim())
}

function walletError(v) {
  const trimmed = v.trim()
  if (!trimmed) return 'Enter your wallet address — it can\u2019t be left blank.'
  if (!isLikelyWallet(trimmed)) return 'That doesn\u2019t look like a valid wallet address (0x followed by 40 characters).'
  return null
}

function isLikelyTweetLink(v) {
  return /^https?:\/\/(x\.com|twitter\.com)\/.+\/status\/\d+/.test(v.trim())
}

function commentLinkError(v) {
  const trimmed = v.trim()
  if (!trimmed) return 'Paste your comment link — it can\u2019t be left blank.'
  if (!isLikelyTweetLink(trimmed)) {
    return 'That doesn\u2019t look like a post link. It should look like https://x.com/yourhandle/status/1234567890.'
  }
  return null
}

export default function Whitelist() {
  const [form, setForm] = useState({
    wallet: '',
    twitter: '',
    followed: false,
    likedAndReposted: false,
    bookmarked: false,
    commented: false,
    commentLink: '',
    // Honeypot — real visitors never see or fill this field (see the input
    // below). If it comes back non-empty, the submission is from a bot and
    // gets silently dropped without touching Supabase.
    company: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    // Once a field has been touched, keep its error live as the person types
    // — don't make them wait for another submit attempt to find out they
    // fixed it (or didn't).
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldError(field, { ...form, [field]: value }) }))
    }
  }

  function handleBlur(field) {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: fieldError(field, form) }))
  }

  function fieldError(field, values) {
    if (field === 'wallet') return walletError(values.wallet)
    if (field === 'twitter') return values.twitter.trim() ? null : 'Enter your X/Twitter username.'
    if (field === 'followed') return values.followed ? null : 'Confirm you followed KIZO on X.'
    if (field === 'likedAndReposted') return values.likedAndReposted ? null : 'Confirm you liked and reposted the post.'
    if (field === 'bookmarked') return values.bookmarked ? null : 'Confirm you bookmarked the post.'
    if (field === 'commented') return values.commented ? null : 'Confirm you left a comment.'
    if (field === 'commentLink') return commentLinkError(values.commentLink)
    return null
  }

  function validate() {
    const fields = ['wallet', 'twitter', 'followed', 'likedAndReposted', 'bookmarked', 'commented', 'commentLink']
    const next = {}
    fields.forEach((f) => {
      const err = fieldError(f, form)
      if (err) next[f] = err
    })
    setErrors(next)
    setTouched(Object.fromEntries(fields.map((f) => [f, true])))
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')

    if (form.company) {
      // Honeypot tripped — a bot filled a field real users never see.
      // Pretend success without writing anything, so the bot doesn't learn
      // its submission was rejected and keep retrying variations.
      setSubmitted(true)
      return
    }

    if (!validate()) return

    if (!supabase) {
      // Supabase isn't configured yet (no .env values set) — surface that
      // clearly instead of pretending the entry was saved.
      setSubmitError(
        'Whitelist storage isn\u2019t connected yet. Add your Supabase project details to .env and restart the site.'
      )
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('whitelist_entries').insert({
      wallet: form.wallet.trim(),
      twitter: form.twitter.trim().replace(/^@/, ''),
      comment_link: form.commentLink.trim(),
    })
    setSubmitting(false)

    if (error) {
      if (error.code === '23505') {
        setSubmitError('That wallet address is already on the whitelist.')
      } else {
        setSubmitError('Something went wrong submitting your entry. Please try again.')
      }
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container-kizo py-24 text-center max-w-xl mx-auto">
        <p className="eyebrow mb-5">Entry received</p>
        <h1 className="font-display text-4xl sm:text-5xl mb-6">You're on the list.</h1>
        <p className="text-stone">
          Keep an eye on{' '}
          <a href="https://x.com/kizohood" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
            @kizohood
          </a>{' '}
          for updates on mint day.
        </p>
      </div>
    )
  }

  return (
    <div>
      <section className="container-kizo pt-16 pb-8 md:pt-24 text-center max-w-2xl mx-auto">
        <p className="eyebrow mb-5">Limited spots</p>
        <h1 className="font-display text-5xl sm:text-6xl mb-6">WHITELIST</h1>
        <p className="text-stone text-lg">
          Complete the steps below to reserve your spot before public mint.
        </p>
      </section>

      <ToriiDivider />

      <section className="container-kizo pb-24 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} noValidate className="card-panel p-8 space-y-8">
          {/* Honeypot field — hidden from real visitors via CSS + kept off
              the tab order, so only automated bots that blindly fill every
              input on a page will ever populate it. */}
          <div className="absolute w-px h-px overflow-hidden opacity-0 -z-10" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="wallet" className="block font-mono text-xs uppercase tracking-widest mb-2">
              Wallet address
            </label>
            <input
              id="wallet"
              type="text"
              placeholder="0x..."
              value={form.wallet}
              onChange={(e) => update('wallet', e.target.value)}
              onBlur={() => handleBlur('wallet')}
              className="w-full border border-ink/20 bg-paper px-4 py-3 font-mono text-sm focus:border-ink outline-none"
            />
            {errors.wallet && touched.wallet && <p className="text-shrine text-xs mt-2">{errors.wallet}</p>}
          </div>

          <div>
            <label htmlFor="twitter" className="block font-mono text-xs uppercase tracking-widest mb-2">
              X (Twitter) username
            </label>
            <input
              id="twitter"
              type="text"
              placeholder="@yourhandle"
              value={form.twitter}
              onChange={(e) => update('twitter', e.target.value)}
              onBlur={() => handleBlur('twitter')}
              className="w-full border border-ink/20 bg-paper px-4 py-3 font-mono text-sm focus:border-ink outline-none"
            />
            {errors.twitter && touched.twitter && <p className="text-shrine text-xs mt-2">{errors.twitter}</p>}
          </div>

          <div className="space-y-5 border-t border-ink/10 pt-6">
            <p className="font-mono text-xs uppercase tracking-widest text-stone">Social tasks</p>

            {/* Task 1: Follow */}
            <div>
              <a
                href={KIZO_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full !py-3 mb-3"
              >
                1. Follow KIZO on X ↗
              </a>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.followed}
                  onChange={(e) => update('followed', e.target.checked)}
                  onBlur={() => handleBlur('followed')}
                  className="mt-1"
                />
                I followed @kizohood
              </label>
              {errors.followed && touched.followed && <p className="text-shrine text-xs mt-2">{errors.followed}</p>}
            </div>

            {/* Task 2: Like & repost */}
            <div>
              <a
                href={KIZO_POST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full !py-3 mb-3"
              >
                2. Open the post ↗
              </a>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.likedAndReposted}
                  onChange={(e) => update('likedAndReposted', e.target.checked)}
                  onBlur={() => handleBlur('likedAndReposted')}
                  className="mt-1"
                />
                I liked and reposted the post
              </label>
              {errors.likedAndReposted && touched.likedAndReposted && (
                <p className="text-shrine text-xs mt-2">{errors.likedAndReposted}</p>
              )}
            </div>

            {/* Task 3: Bookmark */}
            <div>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.bookmarked}
                  onChange={(e) => update('bookmarked', e.target.checked)}
                  onBlur={() => handleBlur('bookmarked')}
                  className="mt-1"
                />
                I bookmarked the post
              </label>
              {errors.bookmarked && touched.bookmarked && <p className="text-shrine text-xs mt-2">{errors.bookmarked}</p>}
            </div>

            {/* Task 4: Comment */}
            <div>
              <label className="flex items-start gap-3 text-sm mb-3">
                <input
                  type="checkbox"
                  checked={form.commented}
                  onChange={(e) => update('commented', e.target.checked)}
                  onBlur={() => handleBlur('commented')}
                  className="mt-1"
                />
                I left a meaningful comment on the post
              </label>
              {errors.commented && touched.commented && <p className="text-shrine text-xs mb-3">{errors.commented}</p>}

              <label htmlFor="commentLink" className="block font-mono text-xs uppercase tracking-widest mb-2">
                Paste your comment link
              </label>
              <input
                id="commentLink"
                type="url"
                placeholder="https://x.com/yourhandle/status/..."
                value={form.commentLink}
                onChange={(e) => update('commentLink', e.target.value)}
                onBlur={() => handleBlur('commentLink')}
                aria-invalid={Boolean(errors.commentLink)}
                aria-describedby="commentLink-help"
                className={`w-full border bg-paper px-4 py-3 font-mono text-sm outline-none ${
                  errors.commentLink && touched.commentLink
                    ? 'border-shrine focus:border-shrine'
                    : 'border-ink/20 focus:border-ink'
                }`}
              />
              <p id="commentLink-help" className="text-stone text-xs mt-2">
                Example: https://x.com/yourhandle/status/1234567890
              </p>
              {errors.commentLink && touched.commentLink && (
                <p className="text-shrine text-xs mt-1">{errors.commentLink}</p>
              )}
            </div>
          </div>

          {submitError && (
            <p className="text-shrine text-sm border border-shrine/40 bg-shrine/5 px-4 py-3">
              {submitError}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Submitting…' : 'Submit entry'}
          </button>
        </form>
      </section>
    </div>
  )
}
