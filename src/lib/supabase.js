import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// If the env vars aren't set yet, we export null instead of throwing, so the
// rest of the site still works while Supabase isn't wired up.
export const supabase = url && anonKey ? createClient(url, anonKey) : null
