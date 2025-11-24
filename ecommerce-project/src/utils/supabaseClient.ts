import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzluhlcahyvfgdoyzycm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6bHVobGNhaHl2Zmdkb3l6eWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDk3NjksImV4cCI6MjA3OTUyNTc2OX0.tKWnBxAd2fUcVRWS631lENlbnlsDRJ4QJdxFhTxy_l4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);