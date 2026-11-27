create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  name text not null,
  slug text not null,
  description text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(store_id, slug)
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  sku text not null unique,
  size text not null,
  color text not null default '',
  price_poisha integer not null check (price_poisha >= 0),
  stock integer not null default 0 check (stock >= 0)
);

alter table stores enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;

create policy "published products are public" on products for select using (published = true);
create policy "published variants are public" on product_variants for select
  using (exists (select 1 from products where products.id = product_id and products.published));
