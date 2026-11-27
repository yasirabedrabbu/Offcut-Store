create table discounts (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  code text not null, kind text not null, value integer not null default 0,
  minimum_poisha integer not null default 0, usage_limit integer, expires_at timestamptz,
  active boolean not null default true, unique(store_id, code)
);
create table courier_accounts (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  provider text not null, credentials jsonb not null default '{}', active boolean not null default false
);
create table blocklist (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  value text not null, kind text not null, note text not null default '', created_at timestamptz not null default now()
);
create table reviews (
  id uuid primary key default gen_random_uuid(), product_id uuid references products(id) on delete cascade,
  user_id uuid references auth.users(id), rating integer check (rating between 1 and 5),
  body text not null, approved boolean not null default false, created_at timestamptz not null default now()
);
alter table discounts enable row level security;
alter table courier_accounts enable row level security;
alter table blocklist enable row level security;
alter table reviews enable row level security;
create policy "approved reviews are public" on reviews for select using (approved = true);
