// plugins/supabase.js
import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin(nuxtApp => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  nuxtApp.provide('supabase', supabase);
});
