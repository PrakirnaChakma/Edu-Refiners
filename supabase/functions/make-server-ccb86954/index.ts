// supabase/functions/make-server-ccb86954/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// Get environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL")!
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

// Initialize Supabase client (used only for protected routes)
const supabase = createClient(supabaseUrl, serviceRoleKey)

// Helper to add CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend URL in production
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
}

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url)

    // -----------------------------
    // Handle preflight requests (OPTIONS)
    // -----------------------------
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    // -----------------------------
    // Public health endpoint
    // -----------------------------
    if (url.pathname.endsWith("/health")) {
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      })
    }

    // -----------------------------
    // POST / insert into table
    // -----------------------------
    if (req.method === "POST") {
      const body = await req.json()
      const name = body.name || "Guest"

      type Row = { name: string }

      const { data, error } = await (supabase
        .from("kv_store_ccb86954")  // <-- Replace with your table name if needed
        .insert([{ name }])
        .select() as unknown as Promise<{ data: Row[]; error: any }>)
        
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        })
      }

      return new Response(JSON.stringify({ message: `Hello ${name}!`, inserted: data ?? [] }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      })
    }

    // -----------------------------
    // Other methods not allowed
    // -----------------------------
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    })

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    })
  }
})
