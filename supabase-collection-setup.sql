-- Run this in the Supabase SQL Editor, same place you ran the whitelist setup.
-- This lets you manage the Collection/Sneak Peek page's images from the
-- Supabase Table Editor instead of editing code every time you reveal one.

create table if not exists collection_spirits (
  id uuid primary key default gen_random_uuid(),
  slot_order int not null unique,
  name text not null,
  revealed boolean not null default false,
  image_url text,
  created_at timestamptz not null default now()
);

-- Row Level Security: the site's public "anon" key may only READ this table.
-- It can never insert, edit, or delete rows — only you can do that, from the
-- Supabase dashboard (Table Editor), which uses your logged-in session, not
-- the anon key.
alter table collection_spirits enable row level security;

create policy "Anyone can view the collection"
  on collection_spirits
  for select
  to anon
  using (true);

-- Seed the 12 slots. Slot 1 is left "revealed" with a placeholder image_url —
-- replace it with the real uploaded image URL (see README for the upload
-- steps). Slots 2–12 stay sealed until you flip revealed to true and add
-- their image_url.
insert into collection_spirits (slot_order, name, revealed, image_url) values
  (1, 'Spirit 01', true, 'REPLACE_WITH_YOUR_IMAGE_URL'),
  (2, 'Spirit 02', false, null),
  (3, 'Spirit 03', false, null),
  (4, 'Spirit 04', false, null),
  (5, 'Spirit 05', false, null),
  (6, 'Spirit 06', false, null),
  (7, 'Spirit 07', false, null),
  (8, 'Spirit 08', false, null),
  (9, 'Spirit 09', false, null),
  (10, 'Spirit 10', false, null),
  (11, 'Spirit 11', false, null),
  (12, 'Spirit 12', false, null)
on conflict (slot_order) do nothing;
