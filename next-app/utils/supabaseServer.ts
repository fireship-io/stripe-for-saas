import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!)