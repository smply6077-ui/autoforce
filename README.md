AUTOPARTS SHOP — publicare pe Vercel + Supabase
=================================================

Magazin online de piese auto, în același stil ca proiectele tale
anterioare: Next.js + Supabase + Vercel. Pașii de mai jos duc de
la zero până la un link funcțional, publicat online.

PASUL 1 — Creează proiectul Supabase
--------------------------------------
1. Mergi pe https://supabase.com → New Project.
2. Meniul din stânga → SQL Editor → New query.
3. Deschide fișierul supabase/schema.sql din acest folder, copiază
   tot conținutul, lipește-l în editor și apasă Run.
   (Creează tabelele: categories, products, product_images, orders,
   order_items — plus regulile de securitate RLS.)

PASUL 2 — Ia cheile din Supabase
----------------------------------
1. Settings (roata din stânga jos) → API.
2. Copiază:
   - "Project URL"      → acesta va fi NEXT_PUBLIC_SUPABASE_URL
   - cheia "publishable" (începe cu sb_publishable_...)
     → aceasta va fi NEXT_PUBLIC_SUPABASE_ANON_KEY
   NU folosi cheia "secret" (sb_secret_...) nicăieri în acest
   proiect — e destinată doar codului de pe server, nu unui site
   public, și nu trebuie pusă într-o variabilă NEXT_PUBLIC_*.

PASUL 3 — Adaugă câteva produse de test
------------------------------------------
În Supabase → Table Editor → adaugă rânduri în "categories", apoi
în "products" (vezi exemple de comenzi SQL în README-ul vechi al
proiectului sau în supabase/schema.sql).

PASUL 4 — Urcă acest folder pe GitHub
----------------------------------------
Nu ai nevoie de git instalat. Cel mai simplu:
1. Mergi pe https://github.com/new și creează un repository nou,
   de exemplu "autoparts-shop" (poate fi Private).
2. Pe pagina repository-ului apasă "uploading an existing file".
3. Trage tot conținutul acestui folder (inclusiv subfolderele
   app/, components/, lib/, supabase/, package.json etc.) și
   apasă "Commit changes".

PASUL 5 — Importă în Vercel
------------------------------
1. Mergi pe https://vercel.com/new
2. Alege "Import" lângă repository-ul autoparts-shop.
3. Înainte de a apăsa Deploy, deschide "Environment Variables"
   și adaugă:
     NEXT_PUBLIC_SUPABASE_URL = <Project URL de la pasul 2>
     NEXT_PUBLIC_SUPABASE_ANON_KEY = <cheia publishable de la pasul 2>
4. Apasă Deploy și așteaptă 1-2 minute.

PASUL 6 — Gata
-----------------
Vercel îți dă un link de forma:
   https://autoparts-shop.vercel.app

DE UNDE EDITEZI CONȚINUTUL
-----------------------------
Un singur fișier concentrează tot ce vrei să schimbi des:
   lib/siteConfig.ts
Acolo găsești: numele magazinului, telefonul, adresa, programul,
imaginea principală de pe pagina de start și textele „Despre noi"
și „Contacte". Editează valorile, fă commit pe GitHub, iar Vercel
redeployează automat.

Produsele, prețurile și categoriile se administrează din Supabase
(Table Editor), nu din cod.

DE ȘTIUT
----------
- Comenzile plasate de clienți ajung direct în tabelul "orders"
  din Supabase — le vezi din Table Editor.
- Nu există încă procesator de plăți online (doar numerar/card la
  livrare). Pentru plată online cu cardul e nevoie de integrare
  separată cu un procesator din Moldova (ex. maib, victoriabank).
- Dacă vrei propriul domeniu (ex. autoparts.md) în loc de
  ...vercel.app, se face din Vercel → Settings → Domains, după ce
  cumperi domeniul de la un registrator (ex. Namecheap).
