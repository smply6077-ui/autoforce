import { siteConfig } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-8 text-sm text-gray-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Toate drepturile rezervate.</p>
        <p>Tel: {siteConfig.phoneDisplay}</p>
      </div>
    </footer>
  );
}
