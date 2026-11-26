-- Apply in the Supabase SQL Editor. Supports fresh and original user_id-based PesaQuest databases.
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

-- Upgrade the original user_id-based PesaQuest tables in place.
create or replace function public.pesaquest_legacy_budget_defaults()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.owner_key is not null then
    new.user_id := coalesce(new.user_id, new.owner_key::uuid);
    if new.owner_key <> new.user_id::text then
      raise exception 'Budget owner must match user_id';
    end if;
    new.name := coalesce(new.name, 'PesaQuest allocation');
    new.amount := coalesce(new.amount, new.allocation);
    new.start_date := coalesce(new.start_date,
      date_trunc('month', now() at time zone 'Africa/Nairobi')::date);
    new.end_date := coalesce(new.end_date,
      (new.start_date + interval '1 month - 1 day')::date);
  end if;
  return new;
end;
$$;

create or replace function public.pesaquest_legacy_transaction_defaults()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.user_id := coalesce(new.user_id, new.owner_key::uuid);
    new.transaction_date := coalesce(new.occurred_on, new.transaction_date);
  elsif new.transaction_date is not distinct from old.transaction_date then
    new.transaction_date := coalesce(new.occurred_on, new.transaction_date);
  end if;
  new.owner_key := new.user_id::text;
  new.occurred_on := new.transaction_date;
  new.occurred_at := coalesce(new.occurred_at,
    (new.created_at at time zone 'Africa/Nairobi')::time, time '00:00');
  new.created_at := coalesce(new.created_at,
    (new.occurred_on + new.occurred_at) at time zone 'Africa/Nairobi');
  new.category := coalesce(new.category, 'Uncategorized');
  new.merchant := coalesce(new.merchant, nullif(trim(new.description), ''), new.category);
  new.source := coalesce(new.source, 'Unknown');
  return new;
end;
$$;

revoke all on function public.pesaquest_legacy_budget_defaults() from public, anon, authenticated;
revoke all on function public.pesaquest_legacy_transaction_defaults() from public, anon, authenticated;

do $$
begin
  if exists (select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'budgets' and column_name = 'user_id') then
    alter table public.budgets
      add column if not exists owner_key text,
      add column if not exists allocation numeric not null default 140000,
      add column if not exists target_rate integer not null default 25,
      add column if not exists updated_at timestamptz not null default now();
    -- Each account gets one allocation row. Legacy category and dated budget
    -- rows keep a null owner_key and retain their original user_id and values.
    create unique index if not exists pesaquest_budget_owner_idx on public.budgets (owner_key);
    drop trigger if exists pesaquest_legacy_budget_defaults on public.budgets;
    create trigger pesaquest_legacy_budget_defaults before insert or update on public.budgets
      for each row execute function public.pesaquest_legacy_budget_defaults();
  end if;

  if exists (select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'transactions' and column_name = 'user_id') then
    alter table public.transactions
      add column if not exists owner_key text,
      add column if not exists merchant text,
      add column if not exists category text,
      add column if not exists source text,
      add column if not exists occurred_on date,
      add column if not exists occurred_at time;
    drop trigger if exists pesaquest_legacy_transaction_defaults on public.transactions;
    create trigger pesaquest_legacy_transaction_defaults before insert or update on public.transactions
      for each row execute function public.pesaquest_legacy_transaction_defaults();
    -- The trigger derives ownership from the original user_id and dates from transaction_date.
    update public.transactions set owner_key = user_id::text where owner_key is null or created_at is null;
    alter table public.transactions alter column owner_key set not null;
  end if;
end;
$$;

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
  using ((select auth.uid())::text = coalesce(owner_key, to_jsonb(budgets)->>'user_id'))
  with check ((select auth.uid())::text = coalesce(owner_key, to_jsonb(budgets)->>'user_id'));

drop policy if exists "account transactions" on public.transactions;
create policy "account transactions" on public.transactions for all to authenticated
  using ((select auth.uid())::text = owner_key)
  with check ((select auth.uid())::text = owner_key);

-- Guard ownership even when an older project has additional permissive policies.
drop policy if exists "budget owner required" on public.budgets;
create policy "budget owner required" on public.budgets as restrictive for all to authenticated
  using ((select auth.uid())::text = coalesce(owner_key, to_jsonb(budgets)->>'user_id'))
  with check ((select auth.uid())::text = coalesce(owner_key, to_jsonb(budgets)->>'user_id'));

drop policy if exists "transaction owner required" on public.transactions;
create policy "transaction owner required" on public.transactions as restrictive for all to authenticated
  using ((select auth.uid())::text = owner_key)
  with check ((select auth.uid())::text = owner_key);

notify pgrst, 'reload schema';
commit;
