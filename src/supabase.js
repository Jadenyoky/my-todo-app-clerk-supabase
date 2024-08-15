import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dlhxuwamtnyhugnltway.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsaHh1d2FtdG55aHVnbmx0d2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2MzI5MzUsImV4cCI6MjAzOTIwODkzNX0.Fos6cSmu5kNIue-66Rb_F26YO_h9AXlmYJGM8ZoN6kg";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
