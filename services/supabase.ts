import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const rawUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseUrl = typeof rawUrl === 'string' ? rawUrl.trim() : undefined;
const rawAnon = Constants.expoConfig?.extra?.supabaseAnonKey;
const supabaseAnonKey = typeof rawAnon === 'string' ? rawAnon.trim() : undefined;

if (!supabaseUrl) {
  throw new Error('Missing supabaseUrl in expo.extra');
}
if (!supabaseAnonKey) {
  throw new Error('Missing supabaseAnonKey in expo.extra');
}

// Basic validation to help catch common mistakes early
if (!supabaseUrl.startsWith('https://')) {
  throw new Error(
    "Invalid supabaseUrl: must start with 'https://'. Copy the Project URL from Supabase Dashboard > Settings > API."
  );
}

// Supabase anon keys are JWT-like strings with two dots
if (!supabaseAnonKey.includes('.')) {
  throw new Error(
    'Invalid supabaseAnonKey format. Use the anon public key from Supabase Dashboard > Settings > API.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}