// netlify/edge-functions/deleteBudgetEntry.js
const supabaseUrl = 'https://zwyblnosnyjagmdsrdhl.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3eWJsbm9zbnlqYWdtZHNyZGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NDUwOTMsImV4cCI6MjA1NTMyMTA5M30.UfGzYIG92muQiXgmwaWrN_SEEOLQoNYxfOeGePp1_70";

export default async (request, context) => {
  try {
    const { id } = await request.json();

    const response = await fetch(
      `${supabaseUrl}/rest/v1/budget_entries?id=eq.${id}`,
      {
        method: 'DELETE',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: data.message || "Error deleting data" }),
        { status: response.status }
      );
    }
    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};