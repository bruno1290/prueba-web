import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '';
const supabaseAnonKey = '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  category: 'iphone' | 'macbook';
  subcategory: string | null;
  price: number;
  description: string;
  storage: string;
  color: string;
  condition: string;
  image_url: string;
  available: boolean;
  created_at: string;
  updated_at: string;
}