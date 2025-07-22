// Em src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Substitua com as informações do seu projeto Supabase!
const supabaseUrl = 'https://gxbsgemoroegvyhtwcow.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YnNnZW1vcm9lZ3Z5aHR3Y293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjExOTIsImV4cCI6MjA2NTkzNzE5Mn0.kUbryLEvkSYYz_ZMSbL1aAoCXFog2bnLeseSgkfwcVE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)