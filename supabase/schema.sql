-- ============================================
-- SCHEMA MAGAZIN PIESE AUTO — Supabase Postgres
-- ============================================

-- Categorii (Optică, Caroserie, Motor, etc.)
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Produse
create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  -- compatibilitate auto: model, generatie, ani
  car_make text,          -- ex: Toyota
  car_model text,         -- ex: Prius
  car_generation text,    -- ex: 30 / ZVW30
  car_year_from int,
  car_year_to int,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),   -- pretul taiat (reducere), null daca nu e reducere
  stock_qty int default 0,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Imagini produs (multiple per produs)
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  sort_order int default 0
);

-- Comenzi
create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  delivery_address text,
  payment_method text check (payment_method in ('cash', 'card')) default 'cash',
  status text check (status in ('pending','confirmed','shipped','completed','cancelled')) default 'pending',
  total numeric(10,2) not null,
  notes text,
  created_at timestamptz default now()
);

-- Produsele dintr-o comanda
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,   -- copie, in caz ca produsul e sters/modificat ulterior
  unit_price numeric(10,2) not null,
  quantity int not null default 1
);

-- Index-uri utile pentru cautare/filtrare rapida
create index idx_products_category on products(category_id);
create index idx_products_car_make_model on products(car_make, car_model);
create index idx_products_active on products(is_active);

-- Row Level Security: citire publica, scriere doar din backend (service role)
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Categorii vizibile public" on categories for select using (true);
create policy "Produse active vizibile public" on products for select using (is_active = true);
create policy "Imagini vizibile public" on product_images for select using (true);

-- Comenzile nu sunt citibile public (doar prin service role / admin panel)
-- Insertia unei comenzi noi e permisa oricui (client anonim plaseaza comanda)
create policy "Oricine poate plasa o comanda" on orders for insert with check (true);
create policy "Oricine poate adauga produse la comanda sa" on order_items for insert with check (true);
