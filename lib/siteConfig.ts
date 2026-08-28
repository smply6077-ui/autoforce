// ============================================================
// SINGURUL FIȘIER PE CARE TREBUIE SĂ-L EDITEZI PENTRU CONȚINUT
// (telefon, adresă, text „despre noi", imaginea principală, etc.)
// ============================================================

export const siteConfig = {
  // Nume afișat în header
  name: 'Autoparts Shop',

  // Adresa completă a site-ului, odată ce ai domeniul (fără slash la final)
  // ex: 'https://autoparts.md' — schimb-o aici după ce cumperi domeniul
  siteUrl: 'https://autoparts-shop.vercel.app',

  // Contacte
  phone: '+37360275222',
  phoneDisplay: '+373 60 27 52 22',
  telegramUrl: 'https://t.me/+37360275222',
  address: 'Strada Meșterul Manole 18, Chișinău, Moldova',
  hours: 'Luni–Vineri, 9:00–18:00',

  // Imaginea mare din pagina principală (poți pune orice URL de imagine)
  heroImageUrl:
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
  heroTitle: 'Piese auto originale și compatibile',
  heroSubtitle: 'Livrare rapidă în Chișinău și în toată Moldova',

  // Text pentru secțiunea „Despre noi" (de pe pagina principală)
  aboutTitle: 'Despre noi',
  aboutText: `Suntem un magazin specializat în piese auto pentru vehicule hibride și pe benzină.
Oferim piese originale și compatibile, cu livrare rapidă și suport tehnic.
Ne ocupăm de diagnosticare, reparații și înlocuiri de componente pentru Toyota, Honda, Ford, Hyundai.`,

  // Text pentru secțiunea „Contacte" (de pe pagina principală)
  contactTitle: 'Contacte',

  // Bannere promoționale de pe pagina principală (2 bucăți, ca în poza cu JBL)
  // Lasă imageUrl gol ('') dacă nu vrei un banner afișat.
  banners: [
    {
      imageUrl: '',
      title: 'Reducere de sezon',
      subtitle: 'Piese pentru pregătirea de iarnă',
      price: '',
      linkHref: '/shop',
    },
    {
      imageUrl: '',
      title: 'Livrare rapidă',
      subtitle: 'Comandă azi, primești în 24h',
      price: '',
      linkHref: '/shop',
    },
  ],

  // Etichete meniu (dacă vrei să schimbi textul butoanelor din navigare)
  nav: {
    shop: 'Magazin',
    repair: 'Servicii auto',
    news: 'Noutăți',
    contact: 'Contacte',
  },
} as const;
