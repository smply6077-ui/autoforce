import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  car_make: string | null;
  car_model: string | null;
  car_generation: string | null;
  car_year_from: number | null;
  car_year_to: number | null;
  price: number;
  compare_at_price: number | null;
  stock_qty: number;
  is_featured: boolean;
  is_active: boolean;
  product_images?: { url: string; sort_order: number }[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  sort_order: number;
};
