// netlify/edge-functions/fetchBudgetEntries.js
import { supabaseUrl, supabaseKey } from '../../src/utils/supabaseClient.ts';

// edge function for netlift to fetch budget entries
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req: Request) => {
  try {
    const { data, error } = await supabase.from('budget_entries').select('*');
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), { status: 500 });
  }
};