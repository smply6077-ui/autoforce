import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

async function getAllProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*, product_images(url, sort_order)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Toate produsele</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-gray-500">Niciun produs adăugat încă.</p>
      )}
    </div>
  );
}
