-- Apply in the Supabase SQL Editor. Existing demo rows are retained and kept private.
begin;

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  owner_key text not null unique,
  allocation numeric not null default 140000,
  target_rate integer not null default 25,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  owner_key text not null,
  merchant text not null,
  description text not null default '',
  amount numeric not null check (amount > 0),
  type text not null check (type in ('income', 'expense', 'transfer')),
  category text not null,
  source text not null default 'M-Pesa',
  occurred_on date not null default current_date,
  occurred_at time not null default localtime,
  created_at timestamptz not null default now()
);

alter table public.budgets alter column owner_key drop default;
alter table public.transactions alter column owner_key drop default;

create index if not exists transactions_owner_id_idx
  on public.transactions (owner_key, id);

alter table public.budgets enable row level security;
alter table public.transactions enable row level security;

revoke all on public.budgets, public.transactions from anon, authenticated, public;
grant select, insert, update on public.budgets to authenticated;
grant select, insert on public.transactions to authenticated;

drop policy if exists "anon select budgets" on public.budgets;
drop policy if exists "anon insert budgets" on public.budgets;
drop policy if exists "anon update budgets" on public.budgets;
drop policy if exists "anon select transactions" on public.transactions;
drop policy if exists "anon insert transactions" on public.transactions;

drop policy if exists "account budgets" on public.budgets;
create policy "account budgets" on public.budgets for all to authenticated
  using ((select auth.uid())::text = owner_key)
  with check ((select auth.uid())::text = owner_key);

drop policy if exists "account transactions" on public.transactions;
create policy "account transactions" on public.transactions for all to authenticated
  using ((select auth.uid())::text = owner_key)
  with check ((select auth.uid())::text = owner_key);

-- Guard ownership even when an older project has additional permissive policies.
drop policy if exists "budget owner required" on public.budgets;
create policy "budget owner required" on public.budgets as restrictive for all to authenticated
  using ((select auth.uid())::text = owner_key)
  with check ((select auth.uid())::text = owner_key);

drop policy if exists "transaction owner required" on public.transactions;
create policy "transaction owner required" on public.transactions as restrictive for all to authenticated
  using ((select auth.uid())::text = owner_key)
  with check ((select auth.uid())::text = owner_key);

commit;
