import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getCategory(slug: string) {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

async function getProducts(categoryId: string): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*, product_images(url, sort_order)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategory(params.slug);
  if (!category) return notFound();

  const products = await getProducts(category.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{category.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-gray-500">Niciun produs în această categorie momentan.</p>
      )}
    </div>
  );
}
