// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// You will find these keys in your Supabase Dashboard under Project Settings -> API
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);