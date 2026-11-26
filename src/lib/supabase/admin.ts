
import "server-only";

import { createClient } from "@supabase/supabase-js";

// Read Supabase credentials from server-side environment variables.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

// Make sure required credentials are available.
if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables."
  );
}

// Create a server-side Supabase client.
// This client is intended for trusted API routes only.
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseSecretKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);
