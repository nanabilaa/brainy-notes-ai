import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || ''; // Load from environment variables
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''; // Load from environment variables

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and anon key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
