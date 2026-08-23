-- Run this in your Supabase project's SQL Editor once, before going live.

create table if not exists whitelist_entries (
  id uuid primary key default gen_random_uuid(),
  wallet text not null,
  twitter text not null,
  retweet_link text not null,
  created_at timestamptz not null default now()
);

-- Prevent the same wallet from registering twice.
create unique index if not exists whitelist_entries_wallet_key
  on whitelist_entries (lower(wallet));

-- Row Level Security: the site uses the public "anon" key, so we only allow
-- that key to INSERT new rows — it can never read, update, or delete rows.
alter table whitelist_entries enable row level security;

create policy "Anyone can submit a whitelist entry"
  on whitelist_entries
  for insert
  to anon
  with check (true);

-- No SELECT policy is created for "anon" on purpose, so submitted entries
-- stay private to you. View them from the Supabase Table Editor, or from a
-- server-side/admin context using your service role key (never expose that
-- key in the frontend).
