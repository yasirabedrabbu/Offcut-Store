create table collections (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  name text not null, slug text not null, description text not null default '',
  published boolean not null default false, created_at timestamptz not null default now(),
  unique(store_id, slug)
);
create table collection_items (
  collection_id uuid references collections(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  position integer not null default 0, primary key(collection_id, product_id)
);
create table product_images (
  product_id uuid references products(id) on delete cascade,
  media_id uuid references media(id) on delete restrict,
  position integer not null default 0, primary key(product_id, media_id)
);
alter table collections enable row level security;
alter table collection_items enable row level security;
alter table product_images enable row level security;
create policy "published collections are public" on collections for select using (published = true);
create policy "published collection items are public" on collection_items for select using (exists (select 1 from collections where id = collection_id and published));
create policy "published product images are public" on product_images for select using (exists (select 1 from products where id = product_id and published));
