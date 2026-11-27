create table inventory_events (
  id bigint generated always as identity primary key,
  variant_id uuid references product_variants(id) on delete cascade,
  store_id uuid references stores(id) on delete cascade,
  delta integer not null, reason text not null, actor_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);
alter table inventory_events enable row level security;
create policy "published inventory is hidden" on inventory_events for select using (false);
