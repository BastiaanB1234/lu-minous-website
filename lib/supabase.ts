import { createClient } from '@supabase/supabase-js'

// Hard coded Supabase credentials for development
const supabaseUrl = 'https://wkbmfqkjutwshywgbjtn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrYm1mcWtqdXR3c2h5d2dianRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjI4NjQsImV4cCI6MjA3MjEzODg2NH0._-Rmo8VHzUmFl50u2bJxfDECqFU3wPi0GZ7MZL3Jyog'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
