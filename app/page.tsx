import Image from 'next/image';
import Link from 'next/link';
import { supabase, Product, Category } from '@/lib/supabase';
import { siteConfig } from '@/lib/siteConfig';
import { getCategoryIcon } from '@/lib/categoryIcons';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from('categories').select('*').order('sort_order');
  return data ?? [];
}

async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*, product_images(url, sort_order)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .limit(10);
  return data ?? [];
}

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <div>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            {siteConfig.heroTitle}
          </h1>
          <p className="text-gray-500 mt-3 text-lg">{siteConfig.heroSubtitle}</p>
          <Link
            href="/shop"
            className="inline-block mt-6 bg-brand text-white font-semibold px-6 py-3 rounded hover:bg-red-700 transition-colors"
          >
            Vezi produsele
          </Link>
        </div>
        <div className="relative aspect-video">
          <Image
            src={siteConfig.heroImageUrl}
            alt={siteConfig.heroTitle}
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* CATEGORII - rand de iconite, ca in poza */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug);
            return (
              <Link
                key={cat.id}
                href={`/product-category/${cat.slug}`}
                className="flex flex-col items-center gap-2 border rounded-lg p-4 hover:border-brand hover:shadow-sm transition-all text-center"
              >
                <Icon size={28} className="text-brand" />
                <span className="text-xs font-semibold uppercase">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PRODUSE RECOMANDATE */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">Produse recomandate</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {featured.length === 0 && (
          <p className="text-gray-500">
            Niciun produs recomandat încă — adaugă produse cu is_featured = true în Supabase.
          </p>
        )}
      </section>

      {/* DESPRE NOI */}
      <section id="despre" className="bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold mb-4">{siteConfig.aboutTitle}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {siteConfig.aboutText}
          </p>
        </div>
      </section>

      {/* CONTACTE */}
      <section id="contacte" className="border-t">
        <div className="max-w-4xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold mb-6">{siteConfig.contactTitle}</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Telefon:</strong>{' '}
              <a href={`tel:${siteConfig.phone}`} className="text-brand hover:underline">
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <p>
              <strong>Telegram:</strong>{' '}
              <a href={siteConfig.telegramUrl} className="text-brand hover:underline">
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <p><strong>Adresă:</strong> {siteConfig.address}</p>
            <p><strong>Program:</strong> {siteConfig.hours}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
