# KIZO — Site

A React + Tailwind site for the KIZO NFT project: Home, Lore, Collection,
Roadmap, Shrine (staking, coming soon), and Whitelist.

## Run it locally

You need Node.js installed (18+). Then:

```
npm install
npm run dev
```

Open the link it prints (usually http://localhost:5173).

## Deploy for free (Vercel)

1. Push this folder to a GitHub repo.
2. Go to vercel.com → "Add New Project" → import that repo.
3. Framework preset: Vite. Build command: `npm run build`. Output dir: `dist`.
4. Deploy. Vercel gives you a free `*.vercel.app` URL immediately.
5. Once you buy the domain on Hostinger, add it in Vercel's project settings
   → Domains, and point your Hostinger DNS to Vercel following the records
   Vercel shows you.

Netlify works the same way if you'd rather use that instead.

## Important: connecting the Whitelist form to Supabase

The Whitelist page is wired to call Supabase, but it needs your project's
credentials before it will actually save entries. Right now, if you submit
the form without those credentials set, it shows an honest error instead of
pretending the entry was saved.

**Set it up:**

1. Create a free project at supabase.com (or use an existing one).
2. In the Supabase dashboard, open the **SQL Editor** and run the contents of
   `supabase-setup.sql` — it creates the `whitelist_entries` table and locks
   it down so the public site key can only add entries, never read, edit, or
   delete them.
3. While you're there, also run `supabase-collection-setup.sql` — it creates
   a `collection_spirits` table so you can manage the Collection page's 12
   sneak-peek slots from the Supabase Table Editor instead of editing code.
   It's read-only from the site's side (same reasoning as above, just SELECT
   instead of INSERT).
4. In Supabase, go to **Settings → API** and copy your **Project URL** and
   **anon public key**.
5. In this project folder, copy `.env.example` to a new file named `.env`,
   and paste those two values in.
6. Restart the dev server (`npm run dev`) so it picks up the new `.env`.
7. Submit a test whitelist entry on the site, then check the **Table Editor**
   in Supabase — you should see it appear in `whitelist_entries`.

When you deploy to Vercel/Netlify, add the same two values as **Environment
Variables** in that platform's project settings (same names:
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) — `.env` itself is not
uploaded to GitHub on purpose, since it's meant to stay private. Either order
works (Supabase first or deploy first), but doing Supabase first means the
form works the moment the site goes live instead of you having to redeploy.

## Revealing a character on the Collection page

Once `collection_spirits` is set up in Supabase, open its **Table Editor**,
find the row for the slot you want to reveal, set `revealed` to `true`, and
paste the image's public URL into `image_url`. To get that URL: create a
public **Storage** bucket in Supabase (e.g. "collection"), upload the image
there, and copy the file's public URL. The site checks this table on every
page load, so the change appears within seconds — no redeploy needed.

If Supabase isn't connected yet, or that table is empty, the page quietly
falls back to local placeholder data instead of breaking.

## Security notes

- **Whitelist table**: the public site key can only INSERT rows — it can
  never read, edit, or delete existing entries. Only you can view them, from
  the Supabase dashboard.
- **Collection table**: the public site key can only SELECT (read) rows — it
  can never write to it. Only you can edit it, from the dashboard.
- **No secret keys in the frontend**: only the Supabase *anon* key (meant to
  be public) ships in the built site. Never put your Supabase *service role*
  key in `.env` or anywhere under `src/` — that key bypasses the rules above.
- **`.env` is gitignored** so your local credentials never get pushed to
  GitHub by accident.
- **Unknown URLs**: any path that isn't a real page (typos, old links, bots
  probing for `/admin` etc.) shows the site's own 404 page instead of a
  broken screen. `vercel.json` / `public/_redirects` are included so this
  keeps working after deploy — without them, refreshing on a page like
  `/lore` directly can show the *hosting platform's* 404 instead of ours.
- **Form validation is a UX layer, not a security boundary** — someone could
  bypass the browser and call Supabase directly, which is exactly why the
  real protection is the database policies above (insert-only / read-only),
  not the on-page checks.
- **Optional next step**: if bot spam on the Whitelist becomes a problem
  later, Supabase supports adding CAPTCHA verification (e.g. hCaptcha) to
  form submissions — worth revisiting once the site is getting real traffic.

## Editing content

- Roadmap phases: `src/pages/Roadmap.jsx`
- Lore chapters: `src/pages/Lore.jsx`
- Collection / sneak peek: `src/pages/Collection.jsx` — pulls from Supabase's
  `collection_spirits` table (see above); falls back to a local 12-slot
  placeholder array in the same file if Supabase isn't set up yet.
- Colors/fonts: `tailwind.config.js` (paper/ink/stone/lime/shrine palette,
  Anton + Space Grotesk + Space Mono type)
- Nav links / socials: `src/components/Nav.jsx` and `src/components/Footer.jsx`
- Signature divider: `src/components/ToriiDivider.jsx`
- 404 page: `src/pages/NotFound.jsx`

