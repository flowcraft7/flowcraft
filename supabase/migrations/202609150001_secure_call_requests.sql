-- Apply in the project's Supabase SQL Editor as the database owner.
-- Public visitors may submit inquiries; existing records remain private.
-- Reference: https://supabase.com/docs/guides/database/postgres/row-level-security
begin;

alter table public.call_requests enable row level security;
revoke all privileges on table public.call_requests from public, anon, authenticated;
revoke all privileges (id, created_at, name, email, message)
  on public.call_requests from public, anon, authenticated;
grant insert (name, email, message) on public.call_requests to anon;

drop policy if exists "flowcraft_public_inquiry_insert" on public.call_requests;
create policy "flowcraft_public_inquiry_insert"
  on public.call_requests for insert to anon
  with check (
    length(trim(name)) between 1 and 120
    and length(email) between 3 and 254
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and length(trim(message)) between 1 and 5500
  );

do $$
declare inquiry_sequence text;
begin
  inquiry_sequence := pg_get_serial_sequence('public.call_requests', 'id');
  if inquiry_sequence is not null then
    execute format('revoke all on sequence %s from public, anon, authenticated', inquiry_sequence);
    execute format('grant usage on sequence %s to anon', inquiry_sequence);
  end if;
end $$;

commit;
