create table pages (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  slug text not null, title text not null, body text not null default '', published boolean not null default false,
  unique(store_id, slug)
);
create table posts (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  slug text not null, title text not null, excerpt text not null default '', body text not null default '',
  published boolean not null default false, created_at timestamptz not null default now()
);
create table settings (
  store_id uuid primary key references stores(id) on delete cascade,
  values jsonb not null default '{}', updated_at timestamptz not null default now()
);
create table analytics_events (
  id bigint generated always as identity primary key, store_id uuid references stores(id) on delete cascade,
  name text not null, value jsonb not null default '{}', created_at timestamptz not null default now()
);
alter table pages enable row level security;
alter table posts enable row level security;
alter table settings enable row level security;
alter table analytics_events enable row level security;
create policy "published pages public" on pages for select using (published = true);
create policy "published posts public" on posts for select using (published = true);
