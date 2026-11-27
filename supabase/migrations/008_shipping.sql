create table shipping_zones (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  name text not null, delivery_poisha integer not null default 0, eta text not null default '3 to 5 days',
  free_threshold_poisha integer
);
alter table shipping_zones enable row level security;
create policy "shipping zones are public" on shipping_zones for select using (true);
