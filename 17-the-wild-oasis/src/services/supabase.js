import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nrgbqrcwswkjoqkioatw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ2JxcmN3c3dram9xa2lvYXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0ODM0MDgsImV4cCI6MjAzOTA1OTQwOH0.GpZuzmFRDGklmlG08f0hY_Lg7xrkyuHPVKh-bSpRqUs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
