-- ============================================================
-- RHRS Website — DB-backed admin credentials
-- Allows admin login via Supabase when Vercel env vars differ
-- or are unset. The login API falls back to this table.
-- ============================================================

create table if not exists admin_config (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  password text not null,
  created_at timestamptz not null default now()
);

alter table admin_config enable row level security;