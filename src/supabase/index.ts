import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase.types'

export const supabase = createClient<Database>(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
)