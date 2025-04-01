import { createClient } from '@supabase/supabase-js';

//Replace with your own Supabase URL and API key kupal ka
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
