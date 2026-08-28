'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cartStore';

export default function AddToCartButton({
  id,
  name,
  price,
  image_url,
  disabled,
}: {
  id: string;
  name: string;
  price: number;
  image_url: string;
  disabled?: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        addItem({ id, name, price, image_url });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className="mt-6 w-full md:w-auto px-8 bg-brand-dark disabled:bg-gray-300 text-white py-3 rounded font-medium hover:bg-black transition-colors"
    >
      {disabled ? 'Stoc epuizat' : added ? 'Adăugat ✓' : 'Adaugă în coș'}
    </button>
  );
}
