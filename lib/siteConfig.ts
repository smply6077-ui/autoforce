// ============================================================
// SINGURUL FIȘIER PE CARE TREBUIE SĂ-L EDITEZI PENTRU CONȚINUT
// (telefon, adresă, text „despre noi", imaginea principală, etc.)
// ============================================================

export const siteConfig = {
  // Nume afișat în header
  name: 'Autoparts Shop',

  // Contacte
  phone: '+37360331941',
  phoneDisplay: '+373 60 33 19 41',
  telegramUrl: 'https://t.me/+37360331941',
  address: 'Strada Meșterul Manole 18/2, Chișinău, Moldova',
  hours: 'Luni–Vineri, 10:00–18:00',

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

  // Etichete meniu (dacă vrei să schimbi textul butoanelor din navigare)
  nav: {
    shop: 'Magazin',
    repair: 'Servicii auto',
    news: 'Noutăți',
    contact: 'Contacte',
  },
} as const;
