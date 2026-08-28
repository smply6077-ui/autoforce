'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, Headphones, ShoppingCart, Menu, Search, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { siteConfig } from '@/lib/siteConfig';
import { getCategoryIcon } from '@/lib/categoryIcons';
import { Category } from '@/lib/supabase';

export default function Header({ categories }: { categories: Category[] }) {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const total = useCartStore((s) => s.total());

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Bara de sus: logo, cautare, contacte, cos */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-bold">
              A
            </div>
            <span className="text-lg font-extrabold tracking-tight">{siteConfig.name}</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md items-center border rounded-full overflow-hidden">
            <input
              placeholder="Caută..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button className="bg-black text-white p-2.5 mr-1 rounded-full">
              <Search size={16} />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm">
            <a href={siteConfig.telegramUrl} className="flex items-center gap-2">
              <Send size={18} />
              <span className="font-semibold">{siteConfig.phoneDisplay}</span>
            </a>
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2">
              <Headphones size={18} />
              <span className="font-semibold">{siteConfig.phoneDisplay}</span>
            </a>
          </div>

          <Link href="/cart" className="flex items-center gap-2 shrink-0">
            <span className="font-semibold text-sm">{total} MDL</span>
            <ShoppingCart size={22} />
          </Link>
        </div>
      </div>

      {/* Bara de navigare + catalog dropdown */}
      <div className="border-b relative">
        <div className="max-w-6xl mx-auto flex items-stretch">
          <button
            onMouseEnter={() => setCatalogOpen(true)}
            onMouseLeave={() => setCatalogOpen(false)}
            className="bg-brand text-white font-bold text-sm px-5 flex items-center gap-2 relative"
          >
            <Menu size={18} />
            CATALOG
            <ChevronDown size={16} />

            {catalogOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border shadow-lg text-black text-left z-50">
                {categories.map((cat) => {
                  const Icon = getCategoryIcon(cat.slug);
                  return (
                    <Link
                      key={cat.id}
                      href={`/product-category/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b last:border-0"
                    >
                      <Icon size={18} className="text-brand" />
                      <span className="text-sm font-medium uppercase">{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </button>

          <nav className="hidden md:flex items-center gap-6 px-6 text-sm font-bold uppercase">
            <Link href="/shop">{siteConfig.nav.shop}</Link>
            <a href="/#despre">{siteConfig.nav.repair}</a>
            <a href="/#noutati">{siteConfig.nav.news}</a>
            <a href="/#contacte">{siteConfig.nav.contact}</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
