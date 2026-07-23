import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


const SUPABASE_URL = 'https://ekcwrmfsgcgbusqmadji.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrY3dybWZzZ2NnYnVzcW1hZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MzUxOTMsImV4cCI6MjEwMDMxMTE5M30.YbqLJtVPTnULpRZxe8nGgI6QZnT7qKMY0Whr84BaUFU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
