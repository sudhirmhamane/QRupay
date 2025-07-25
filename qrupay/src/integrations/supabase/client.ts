import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase environment variables are missing.");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Medication CRUD
type Medication = Database['public']['Tables']['medications']['Row'];
type MedicationInsert = Database['public']['Tables']['medications']['Insert'];
type MedicationUpdate = Database['public']['Tables']['medications']['Update'];

export async function getMedications(userId: string) {
  return supabase
    .from('medications')
    .select('*')
    .eq('user_id', userId)
    .order('start_date', { ascending: false });
}

export async function addMedication(medication: MedicationInsert) {
  return supabase
    .from('medications')
    .insert([medication]);
}

export async function updateMedication(id: string, updates: MedicationUpdate) {
  return supabase
    .from('medications')
    .update(updates)
    .eq('id', id);
}

export async function deleteMedication(id: string) {
  return supabase
    .from('medications')
    .delete()
    .eq('id', id);
}

export async function getMedicalProfile(userId: string) {
  return supabase
    .from('medical_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
}

export async function updateMedicalProfile(userId: string, data: any) {
  return supabase
    .from('medical_profiles')
    .upsert({
      user_id: userId,
      ...data,
    }, { onConflict: 'user_id' });
}