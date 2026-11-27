create type user_role as enum ('owner', 'admin', 'packer', 'support', 'customer');
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  store_id uuid references stores(id) on delete set null,
  full_name text not null default '',
  phone text not null default '',
  role user_role not null default 'customer',
  created_at timestamptz not null default now()
);
alter table profiles enable row level security;
create policy "users read own profile" on profiles for select using (id = auth.uid());
create or replace function create_profile() returns trigger language plpgsql security definer as $$
begin insert into profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', '')); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function create_profile();
