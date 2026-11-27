create table audit_logs (
  id bigint generated always as identity primary key,
  store_id uuid references stores(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null, entity text not null, entity_id text, meta jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create table rate_limits (key text primary key, hits integer not null default 0, reset_at timestamptz not null);
alter table audit_logs enable row level security;
alter table rate_limits enable row level security;
create or replace function check_rate_limit(input_key text, max_hits integer, window_seconds integer) returns boolean language plpgsql security definer as $$
declare current_hits integer; begin
  insert into rate_limits values (input_key, 1, now() + make_interval(secs => window_seconds))
  on conflict (key) do update set hits = case when rate_limits.reset_at < now() then 1 else rate_limits.hits + 1 end, reset_at = case when rate_limits.reset_at < now() then excluded.reset_at else rate_limits.reset_at end;
  select hits into current_hits from rate_limits where key = input_key; return current_hits <= max_hits;
end; $$;
