create table media (
  id uuid primary key default gen_random_uuid(), store_id uuid references stores(id) on delete cascade,
  path text not null unique, folder text not null default 'other', alt text not null,
  mime text not null, size integer not null, width integer, height integer,
  created_by uuid references auth.users(id), created_at timestamptz not null default now()
);
alter table media enable row level security;
create policy "media public read" on media for select using (true);
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
