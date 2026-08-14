-- ============================================================
-- RHRS Website — Member designations
-- Adds designation columns to the members table so the admin
-- can assign level-wise designations (National/Zonal/State/
-- District/Constituency/Mandal + Mahila/Yuva Morcha) with a
-- 10-digit serial number. Quota: 10 per designation category.
-- ============================================================

alter table members add column if not exists designation_level text;
alter table members add column if not exists designation_title text;
alter table members add column if not exists designation_state text;
alter table members add column if not exists designation_number text;

alter table members drop constraint if exists members_designation_level_check;

alter table members add constraint members_designation_level_check
check (
  designation_level in ('national', 'zonal', 'state', 'district', 'constituency', 'mandal', 'mahila_morcha', 'yuva_morcha')
  or designation_level is null
);
