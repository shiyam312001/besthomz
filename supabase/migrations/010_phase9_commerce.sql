-- Phase 9: checkout, Razorpay, order snapshots, status history

-- Order number format: BH-ORD-YYYY-######
create or replace function public.set_order_number()
returns trigger
language plpgsql
as $$
declare
  year_part text;
  seq_part text;
begin
  if new.order_number is null or new.order_number = '' then
    year_part := to_char(now(), 'YYYY');
    seq_part := lpad(nextval('public.order_number_seq')::text, 6, '0');
    new.order_number := 'BH-ORD-' || year_part || '-' || seq_part;
  end if;
  return new;
end;
$$;

alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders
  add constraint orders_status_check
  check (status in ('pending', 'confirmed', 'processing', 'ready', 'shipped', 'delivered', 'cancelled', 'refunded'));

alter table public.orders
  add column if not exists payment_status text not null default 'pending'
    check (payment_status in ('pending', 'created', 'authorized', 'paid', 'failed', 'cancelled', 'refunded'));

alter table public.orders
  add column if not exists discount numeric(12, 2) default 0,
  add column if not exists shipping numeric(12, 2) default 0,
  add column if not exists billing_address jsonb default '{}'::jsonb,
  add column if not exists shipping_address jsonb default '{}'::jsonb,
  add column if not exists customer_notes text;

alter table public.order_items
  add column if not exists product_name_snapshot text,
  add column if not exists sku_snapshot text;

alter table public.payments drop constraint if exists payments_status_check;
alter table public.payments
  add constraint payments_status_check
  check (status in ('pending', 'created', 'authorized', 'paid', 'failed', 'cancelled', 'refunded'));

alter table public.payments
  add column if not exists provider_order_id text,
  add column if not exists provider_payment_id text,
  add column if not exists provider_signature text,
  add column if not exists failure_reason text,
  add column if not exists paid_at timestamptz;

create unique index if not exists idx_payments_provider_payment_id
  on public.payments (provider, provider_payment_id)
  where provider_payment_id is not null;

alter table public.quote_requests
  add column if not exists approved_total numeric(12, 2);

create table if not exists public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by uuid references auth.users (id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists idx_order_status_history_order_id on public.order_status_history (order_id);

create or replace function public.log_order_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and old.status is distinct from new.status then
    insert into public.order_status_history (order_id, old_status, new_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists orders_status_history on public.orders;
create trigger orders_status_history
after update on public.orders
for each row execute function public.log_order_status_change();

alter table public.order_status_history enable row level security;

create policy "order_history_select_own"
on public.order_status_history for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or public.is_staff())
  )
);

create policy "order_history_staff_insert"
on public.order_status_history for insert
to authenticated
with check (public.is_staff());

comment on column public.orders.billing_address is 'JSON snapshot at checkout';
comment on column public.order_items.product_name_snapshot is 'Immutable product title at order time';
