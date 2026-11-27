create table theme_config (
  store_id uuid primary key references stores(id) on delete cascade,
  config jsonb not null default '{}', updated_at timestamptz not null default now()
);
create table home_sections (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  section_key text not null, position integer not null default 0,
  settings jsonb not null default '{}', enabled boolean not null default true,
  unique(store_id, section_key)
);
create table menus (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  location text not null, items jsonb not null default '[]', updated_at timestamptz not null default now(),
  unique(store_id, location)
);
alter table theme_config enable row level security;
alter table home_sections enable row level security;
alter table menus enable row level security;
create policy "theme is public" on theme_config for select using (true);
create policy "home sections are public" on home_sections for select using (enabled = true);
create policy "menus are public" on menus for select using (true);
