import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 60;

async function getProduct(slug: string) {
  const { data } = await supabase
    .from('products')
    .select('*, product_images(url, sort_order)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  const images = product.product_images?.length
    ? product.product_images
    : [{ url: '/placeholder.png' }];

  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

  const compatibility = [
    product.car_make,
    product.car_model,
    product.car_generation,
    product.car_year_from && product.car_year_to
      ? `${product.car_year_from}–${product.car_year_to}`
      : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
      <div>
        <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={images[0].url}
            alt={product.name}
            fill
            className="object-contain p-6"
          />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 mt-3">
            {images.slice(1).map((img: any, i: number) => (
              <div key={i} className="relative w-20 h-20 border rounded overflow-hidden">
                <Image src={img.url} alt="" fill className="object-contain" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        {compatibility && (
          <p className="text-gray-500 mt-1">Compatibil: {compatibility}</p>
        )}

        <div className="mt-4 flex items-center gap-3">
          {hasDiscount && (
            <span className="text-gray-400 line-through">
              {product.compare_at_price} MDL
            </span>
          )}
          <span className="text-3xl font-bold text-brand">{product.price} MDL</span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {product.stock_qty > 0 ? `În stoc: ${product.stock_qty} buc.` : 'Stoc epuizat'}
        </p>

        <AddToCartButton
          id={product.id}
          name={product.name}
          price={product.price}
          image_url={images[0].url}
          disabled={product.stock_qty <= 0}
        />

        {product.description && (
          <div className="mt-8">
            <h2 className="font-semibold mb-2">Descriere</h2>
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
