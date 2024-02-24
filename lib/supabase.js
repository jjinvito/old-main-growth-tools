import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rfbxrkghehiguqabonke.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmYnhya2doZWhpZ3VxYWJvbmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2OTU3MDksImV4cCI6MjAyMjI3MTcwOX0.oueOnTKpB2qWfsXMV0DIRdvx4ecjQVc5RlE-8du3AaQ";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
