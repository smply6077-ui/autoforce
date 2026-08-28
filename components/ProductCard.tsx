'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/supabase';
import { useCartStore } from '@/lib/cartStore';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const image = product.product_images?.[0]?.url ?? '/placeholder.png';
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;
  const discountPct = hasDiscount
    ? Math.round(
        ((product.compare_at_price! - product.price) / product.compare_at_price!) * 100
      )
    : 0;

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow relative">
      {hasDiscount && (
        <span className="absolute top-2 left-2 bg-brand text-white text-xs px-2 py-1 rounded z-10">
          -{discountPct}%
        </span>
      )}
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square bg-gray-50">
          <Image src={image} alt={product.name} fill className="object-contain p-4" />
        </div>
      </Link>
      <div className="p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium line-clamp-2 hover:text-brand min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          {hasDiscount && (
            <span className="text-gray-400 line-through text-xs">
              {product.compare_at_price} MDL
            </span>
          )}
          <span className="font-bold text-brand">{product.price} MDL</span>
        </div>
        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image_url: image,
            })
          }
          className="mt-3 w-full bg-brand-dark text-white text-sm py-2 rounded hover:bg-black transition-colors"
        >
          Adaugă în coș
        </button>
      </div>
    </div>
  );
}
