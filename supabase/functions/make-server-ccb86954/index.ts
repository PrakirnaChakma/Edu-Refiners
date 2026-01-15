import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// Get environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL")!
const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY")!

// Initialize Supabase client
const supabase = createClient(supabaseUrl, serviceRoleKey)

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url)

    // Health endpoint
    if (url.pathname.endsWith("/health")) {
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Handle POST requests
    if (req.method === "POST") {
      const body = await req.json()
      const name = body.name || "Guest"

      // Example: insert into your "users" table (replace with your table name)
      const { data, error } = await supabase
        .from("kv_store_ccb86954") // <-- Replace with your table
        .insert([{ name }])
        .select()

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        })
      }

      return new Response(JSON.stringify({ message: `Hello ${name}!`, inserted: data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Other methods not allowed
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
})
