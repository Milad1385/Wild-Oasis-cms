import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://oaxtdqlkuburavhlmfhm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9heHRkcWxrdWJ1cmF2aGxtZmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3MTQzOTUsImV4cCI6MjAyNTI5MDM5NX0.hdSd9hWZg1ntPDaFzhxE2xsVEKxaHemUED1e1L2pl2g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
