import { createClient } from "@supabase/supabase-js";

// Supabase project credentials
const SUPABASE_URL = "https://gkwelmlamuvcbqlysmfi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrd2VsbWxhbXV2Y2JxbHlzbWZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTg1NjIsImV4cCI6MjA3ODc5NDU2Mn0.aBxKEFX5QgjE1bXwMfM1TIuY7GHaw6JSvhxv5Y-GGGE"; // replace with your anon key from Supabase API

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
