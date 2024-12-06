import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://nrmqsqhrgiweoizqicnh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybXFzcWhyZ2l3ZW9penFpY25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NjU5ODYsImV4cCI6MjA0OTA0MTk4Nn0.R8SUOzmLX0I-9P0CskQD5xBZHYsbn92d1YHLRgDX-18"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})