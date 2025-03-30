// netlify/edge-functions/insertBudgetEntry.js
const supabaseUrl = 'https://zwyblnosnyjagmdsrdhl.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3eWJsbm9zbnlqYWdtZHNyZGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NDUwOTMsImV4cCI6MjA1NTMyMTA5M30.UfGzYIG92muQiXgmwaWrN_SEEOLQoNYxfOeGePp1_70";

export default async (request, context) => {
  try {
    const { title, amount, fixedCost, category } = await request.json();

    const response = await fetch(`${supabaseUrl}/rest/v1/budget_entries`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, amount, fixedCost, category })
    });

    const data = await response.json();
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: data.message || "Error inserting data" }),
        { status: response.status }
      );
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};