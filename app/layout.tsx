import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.heroSubtitle,
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order');

  return (
    <html lang="ro">
      <body>
        <Header categories={categories ?? []} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
