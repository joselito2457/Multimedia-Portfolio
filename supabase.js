import { createClient } from '@supabase/supabase-js';

//Replace with your own Supabase URL and API key kupal ka
const supabaseUrl = 'https://uqwxzfuyfdyxbvvfdkif.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxd3h6ZnV5ZmR5eGJ2dmZka2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MTM1MjMsImV4cCI6MjA1OTA4OTUyM30.nu78GL5Mr0XDyMZ3qjB2NMOwU_yENyfBMRceuxqET5A';

export const supabase = createClient(supabaseUrl, supabaseKey);
