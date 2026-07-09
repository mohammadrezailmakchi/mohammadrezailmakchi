-- Enable Row Level Security (RLS) and structure the project_requests table
-- following Supabase Postgres Best Practices.

create table if not exists public.project_requests (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) >= 2),
  email text not null check (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$'),
  details text not null check (char_length(details) >= 10),
  budget text not null,
  urgency text not null check (urgency in ('low', 'medium', 'high', 'critical')),
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.project_requests enable row level security;
alter table public.project_requests force row level security;

-- Create policy to allow anonymous/public users to insert new requests (anonymous writes)
create policy "Allow anonymous inserts" 
on public.project_requests 
for insert 
to anon 
with check (true);

-- Ensure public cannot read or select data (prevents data leaks of contact forms)
create policy select_project_requests_policy on public.project_requests
  for select
  to authenticated
  using (true);
