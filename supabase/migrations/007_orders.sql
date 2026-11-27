create table addresses (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id),
  name text not null, phone text not null, district text not null, thana text not null,
  area text not null, details text not null, created_at timestamptz not null default now()
);
create table orders (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id),
  user_id uuid references auth.users(id), status text not null default 'pending',
  customer_name text not null, phone text not null, address jsonb not null,
  subtotal_poisha integer not null, delivery_poisha integer not null,
  total_poisha integer not null, payment_method text not null default 'cod',
  created_at timestamptz not null default now()
);
create table order_items (
  id bigint generated always as identity primary key, order_id uuid references orders(id) on delete cascade,
  variant_id uuid references product_variants(id), name text not null, quantity integer not null,
  price_poisha integer not null
);
create table payments (
  id uuid primary key default gen_random_uuid(), order_id uuid references orders(id),
  method text not null, status text not null default 'pending', provider_reference text,
  created_at timestamptz not null default now()
);
create table order_events (
  id bigint generated always as identity primary key, order_id uuid references orders(id) on delete cascade,
  status text not null, note text not null default '', created_at timestamptz not null default now()
);
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payments enable row level security;
alter table order_events enable row level security;
create policy "customers read own orders" on orders for select using (user_id = auth.uid());
create policy "customers read own order items" on order_items for select using (exists (select 1 from orders where id = order_id and user_id = auth.uid()));
