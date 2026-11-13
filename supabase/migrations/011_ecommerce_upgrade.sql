-- Phase 11: ecommerce upgrade (guest orders, RBAC, addresses, payments extras)
-- Additive only. Does not drop customer data.

-- ---------------------------------------------------------------------------
-- Profiles / roles
-- ---------------------------------------------------------------------------

alter table public.profiles
  add column if not exists is_blocked boolean not null default false,
  add column if not exists terms_accepted_at timestamptz,
  add column if not exists support_notes text;

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check
  check (role in (
    'customer',
    'staff',
    'admin',
    'super_admin',
    'order_manager',
    'product_manager',
    'customer_support'
  ));

create table if not exists public.user_roles (
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null
    check (role in (
      'customer',
      'staff',
      'admin',
      'super_admin',
      'order_manager',
      'product_manager',
      'customer_support'
    )),
  granted_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create or replace function public.staff_roles()
returns text[]
language sql
immutable
as $$
  select array[
    'staff',
    'admin',
    'super_admin',
    'order_manager',
    'product_manager',
    'customer_support'
  ];
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role = any (public.staff_roles())
      and coalesce(p.is_blocked, false) = false
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
      and coalesce(p.is_blocked, false) = false
  );
$$;

create or replace function public.prevent_profile_privilege_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and not public.is_admin() then
    new.role := old.role;
    new.is_blocked := old.is_blocked;
    new.support_notes := old.support_notes;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_prevent_privilege_escalation on public.profiles;
create trigger profiles_prevent_privilege_escalation
before update on public.profiles
for each row execute function public.prevent_profile_privilege_escalation();

-- ---------------------------------------------------------------------------
-- Addresses
-- ---------------------------------------------------------------------------

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text,
  full_name text,
  phone text,
  line1 text not null,
  line2 text,
  city text not null,
  state text,
  pincode text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists addresses_set_updated_at on public.addresses;
create trigger addresses_set_updated_at
before update on public.addresses
for each row execute function public.set_updated_at();

create index if not exists idx_addresses_user_id on public.addresses (user_id);

-- ---------------------------------------------------------------------------
-- Products extras
-- ---------------------------------------------------------------------------

alter table public.products
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists stock_quantity int,
  add column if not exists source_folder text;

create table if not exists public.inventory (
  product_id uuid primary key references public.products (id) on delete cascade,
  quantity int,
  low_stock_threshold int default 2,
  track_inventory boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_transactions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  delta int not null,
  reason text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Orders: guest checkout + richer status
-- ---------------------------------------------------------------------------

alter table public.orders alter column user_id drop not null;

alter table public.orders
  add column if not exists guest_email text,
  add column if not exists guest_phone text,
  add column if not exists guest_name text,
  add column if not exists guest_access_token_hash text,
  add column if not exists payment_method text,
  add column if not exists tracking_number text,
  add column if not exists tracking_url text,
  add column if not exists idempotency_key text,
  add column if not exists admin_notes text,
  add column if not exists is_guest boolean not null default false;

create unique index if not exists idx_orders_idempotency_key
  on public.orders (idempotency_key)
  where idempotency_key is not null;

alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders
  add constraint orders_status_check
  check (status in (
    'pending',
    'confirmed',
    'processing',
    'packed',
    'ready',
    'shipped',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'return_requested',
    'returned',
    'refunded'
  ));

-- ---------------------------------------------------------------------------
-- Payments extras
-- ---------------------------------------------------------------------------

create table if not exists public.payment_webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'razorpay',
  event_id text,
  event_type text,
  payload jsonb not null default '{}'::jsonb,
  processed boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_payment_webhook_event_id
  on public.payment_webhook_events (provider, event_id)
  where event_id is not null;

alter table public.payments
  add column if not exists method text,
  add column if not exists emi_plan jsonb;

-- ---------------------------------------------------------------------------
-- Coupons
-- ---------------------------------------------------------------------------

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_type text not null default 'percent'
    check (discount_type in ('percent', 'fixed')),
  discount_value numeric(12, 2) not null,
  min_order_value numeric(12, 2) default 0,
  max_redemptions int,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references public.coupons (id) on delete cascade,
  order_id uuid references public.orders (id) on delete set null,
  user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Delivery
-- ---------------------------------------------------------------------------

create table if not exists public.delivery_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  pincode_prefix text,
  pincode text,
  charge numeric(12, 2) default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Notifications, returns, refunds, logs
-- ---------------------------------------------------------------------------

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  channel text not null default 'email',
  template_key text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'queued'
    check (status in ('queued', 'sent', 'failed', 'skipped')),
  error text,
  created_at timestamptz not null default now()
);

create table if not exists public.returns (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  reason text,
  status text not null default 'requested'
    check (status in ('requested', 'approved', 'rejected', 'received', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.refunds (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  payment_id uuid references public.payments (id) on delete set null,
  amount numeric(12, 2),
  status text not null default 'pending'
    check (status in ('pending', 'processed', 'failed')),
  provider_reference text,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.user_roles enable row level security;
alter table public.addresses enable row level security;
alter table public.inventory enable row level security;
alter table public.inventory_transactions enable row level security;
alter table public.payment_webhook_events enable row level security;
alter table public.coupons enable row level security;
alter table public.coupon_redemptions enable row level security;
alter table public.delivery_zones enable row level security;
alter table public.notifications enable row level security;
alter table public.returns enable row level security;
alter table public.refunds enable row level security;
alter table public.admin_activity_logs enable row level security;

drop policy if exists "user_roles_select_own" on public.user_roles;
create policy "user_roles_select_own"
on public.user_roles for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "user_roles_admin_write" on public.user_roles;
create policy "user_roles_admin_write"
on public.user_roles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "addresses_select_own" on public.addresses;
create policy "addresses_select_own"
on public.addresses for select
to authenticated
using (user_id = auth.uid() or public.is_staff());

drop policy if exists "addresses_insert_own" on public.addresses;
create policy "addresses_insert_own"
on public.addresses for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "addresses_update_own" on public.addresses;
create policy "addresses_update_own"
on public.addresses for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "addresses_delete_own" on public.addresses;
create policy "addresses_delete_own"
on public.addresses for delete
to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "inventory_staff" on public.inventory;
create policy "inventory_staff"
on public.inventory for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "inventory_tx_staff" on public.inventory_transactions;
create policy "inventory_tx_staff"
on public.inventory_transactions for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "webhooks_staff_read" on public.payment_webhook_events;
create policy "webhooks_staff_read"
on public.payment_webhook_events for select
to authenticated
using (public.is_staff());

drop policy if exists "coupons_public_read_active" on public.coupons;
create policy "coupons_public_read_active"
on public.coupons for select
to anon, authenticated
using (is_active = true);

drop policy if exists "coupons_staff_write" on public.coupons;
create policy "coupons_staff_write"
on public.coupons for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "coupon_redemptions_own" on public.coupon_redemptions;
create policy "coupon_redemptions_own"
on public.coupon_redemptions for select
to authenticated
using (user_id = auth.uid() or public.is_staff());

drop policy if exists "delivery_zones_public_read" on public.delivery_zones;
create policy "delivery_zones_public_read"
on public.delivery_zones for select
to anon, authenticated
using (is_active = true);

drop policy if exists "delivery_zones_staff" on public.delivery_zones;
create policy "delivery_zones_staff"
on public.delivery_zones for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "notifications_own" on public.notifications;
create policy "notifications_own"
on public.notifications for select
to authenticated
using (user_id = auth.uid() or public.is_staff());

drop policy if exists "returns_own" on public.returns;
create policy "returns_own"
on public.returns for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or public.is_staff())
  )
);

drop policy if exists "returns_staff_write" on public.returns;
create policy "returns_staff_write"
on public.returns for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "refunds_own" on public.refunds;
create policy "refunds_own"
on public.refunds for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or public.is_staff())
  )
);

drop policy if exists "refunds_staff_write" on public.refunds;
create policy "refunds_staff_write"
on public.refunds for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "admin_logs_admin" on public.admin_activity_logs;
create policy "admin_logs_admin"
on public.admin_activity_logs for select
to authenticated
using (public.is_admin());

drop policy if exists "admin_logs_staff_insert" on public.admin_activity_logs;
create policy "admin_logs_staff_insert"
on public.admin_activity_logs for insert
to authenticated
with check (public.is_staff());

-- Customers must not update payment status (already staff-write on payments)
-- Guest orders are never selectable via anon RLS; lookup is server-side with token hash.
