-- Best Homz — initial relational schema (quote-first, price-ready)

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Profiles (extends auth.users)
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  email text,
  avatar_url text,
  role text not null default 'customer'
    check (role in ('customer', 'staff', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'customer'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Staff / admin helpers (used in RLS)
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role in ('staff', 'admin')
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
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Catalog: categories & subcategories
-- ---------------------------------------------------------------------------

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create table public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, slug)
);

create trigger subcategories_set_updated_at
before update on public.subcategories
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Materials, colours, finishes (lookup tables)
-- ---------------------------------------------------------------------------

create table public.materials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger materials_set_updated_at
before update on public.materials
for each row execute function public.set_updated_at();

create table public.colours (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  hex_code text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger colours_set_updated_at
before update on public.colours
for each row execute function public.set_updated_at();

create table public.finishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger finishes_set_updated_at
before update on public.finishes
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Products
-- ---------------------------------------------------------------------------

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  category_id uuid references public.categories (id) on delete set null,
  subcategory_id uuid references public.subcategories (id) on delete set null,
  brand text default 'BEST HOMZ',
  sku text unique,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'inactive', 'archived')),
  is_featured boolean not null default false,
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  is_customizable boolean not null default false,
  is_quote_enabled boolean not null default true,
  warranty text,
  care_instructions text,
  dimensions jsonb,
  material_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  image_url text not null,
  alt_text text,
  image_type text not null default 'gallery'
    check (image_type in ('primary', 'gallery', 'thumbnail', 'lifestyle', 'detail', 'configuration')),
  sort_order int not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  name text not null,
  sku text,
  description text,
  is_active boolean not null default true,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, name)
);

create trigger product_variants_set_updated_at
before update on public.product_variants
for each row execute function public.set_updated_at();

create table public.product_features (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  feature text not null,
  description text,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.product_specifications (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  specification_name text not null,
  specification_value text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Future pricing (not shown in quote-first UI)
create table public.product_pricing (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  variant_id uuid references public.product_variants (id) on delete cascade,
  price numeric(12, 2),
  compare_at_price numeric(12, 2),
  sale_price numeric(12, 2),
  currency text not null default 'INR',
  is_active boolean not null default false,
  effective_from timestamptz,
  effective_to timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger product_pricing_set_updated_at
before update on public.product_pricing
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Rooms & collections
-- ---------------------------------------------------------------------------

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  hero_image text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger rooms_set_updated_at
before update on public.rooms
for each row execute function public.set_updated_at();

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  hero_image text,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger collections_set_updated_at
before update on public.collections
for each row execute function public.set_updated_at();

create table public.collection_products (
  collection_id uuid not null references public.collections (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  primary key (collection_id, product_id)
);

-- ---------------------------------------------------------------------------
-- Offers
-- ---------------------------------------------------------------------------

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  image_url text,
  offer_type text not null default 'general'
    check (offer_type in ('new_collection', 'seasonal', 'bundle', 'showroom', 'customization', 'general')),
  cta_label text,
  cta_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger offers_set_updated_at
before update on public.offers
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Wishlist
-- ---------------------------------------------------------------------------

create table public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger wishlists_set_updated_at
before update on public.wishlists
for each row execute function public.set_updated_at();

create table public.wishlist_items (
  wishlist_id uuid not null references public.wishlists (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (wishlist_id, product_id)
);

-- ---------------------------------------------------------------------------
-- Cart
-- ---------------------------------------------------------------------------

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  session_id text,
  status text not null default 'active'
    check (status in ('active', 'converted', 'abandoned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (user_id is not null or session_id is not null)
);

create trigger carts_set_updated_at
before update on public.carts
for each row execute function public.set_updated_at();

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  variant_id uuid references public.product_variants (id) on delete set null,
  quantity int not null default 1 check (quantity > 0),
  customization_data jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger cart_items_set_updated_at
before update on public.cart_items
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Quotes
-- ---------------------------------------------------------------------------

create sequence public.quote_number_seq;

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  quote_number text not null unique,
  user_id uuid references auth.users (id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  location text,
  furniture_requirement text,
  customization_requirement text,
  room_size text,
  budget_range text,
  preferred_contact_method text,
  message text,
  status text not null default 'new'
    check (status in (
      'new',
      'contacted',
      'requirement_confirmed',
      'quote_prepared',
      'awaiting_customer',
      'approved',
      'rejected',
      'converted_to_order',
      'closed'
    )),
  assigned_to uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger quote_requests_set_updated_at
before update on public.quote_requests
for each row execute function public.set_updated_at();

create or replace function public.set_quote_number()
returns trigger
language plpgsql
as $$
declare
  year_part text;
  seq_part text;
begin
  if new.quote_number is null or new.quote_number = '' then
    year_part := to_char(now(), 'YYYY');
    seq_part := lpad(nextval('public.quote_number_seq')::text, 6, '0');
    new.quote_number := 'BH-Q-' || year_part || '-' || seq_part;
  end if;
  return new;
end;
$$;

create trigger quote_requests_set_quote_number
before insert on public.quote_requests
for each row execute function public.set_quote_number();

create table public.quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quote_requests (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  variant_id uuid references public.product_variants (id) on delete set null,
  quantity int not null default 1 check (quantity > 0),
  customization_data jsonb default '{}'::jsonb,
  customer_note text,
  unit_price numeric(12, 2),
  quoted_price numeric(12, 2),
  discount numeric(12, 2),
  created_at timestamptz not null default now()
);

create table public.quote_status_history (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quote_requests (id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by uuid references auth.users (id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create or replace function public.log_quote_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and old.status is distinct from new.status then
    insert into public.quote_status_history (quote_id, old_status, new_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());
  end if;
  return new;
end;
$$;

create trigger quote_requests_status_history
after update on public.quote_requests
for each row execute function public.log_quote_status_change();

-- ---------------------------------------------------------------------------
-- Customizations
-- ---------------------------------------------------------------------------

create table public.customizations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  quote_id uuid references public.quote_requests (id) on delete set null,
  product_id uuid references public.products (id) on delete set null,
  name text,
  size text,
  material text,
  colour text,
  finish text,
  notes text,
  configuration_data jsonb default '{}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'submitted', 'quoted', 'approved', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger customizations_set_updated_at
before update on public.customizations
for each row execute function public.set_updated_at();

create table public.customization_items (
  id uuid primary key default gen_random_uuid(),
  customization_id uuid not null references public.customizations (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  variant_id uuid references public.product_variants (id) on delete set null,
  label text,
  value text,
  sort_order int not null default 0,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Showroom, contact, newsletter
-- ---------------------------------------------------------------------------

create table public.showroom_visits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  preferred_date date,
  preferred_time text,
  visitors_count int check (visitors_count is null or visitors_count > 0),
  requirement text,
  message text,
  status text not null default 'requested'
    check (status in ('requested', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger showroom_visits_set_updated_at
before update on public.showroom_visits
for each row execute function public.set_updated_at();

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  subject text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'read', 'replied', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger contact_messages_set_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger newsletter_subscribers_set_updated_at
before update on public.newsletter_subscribers
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Reviews & FAQ
-- ---------------------------------------------------------------------------

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  title text,
  review text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, user_id)
);

create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function public.set_updated_at();

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger faqs_set_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Site settings
-- ---------------------------------------------------------------------------

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  description text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Future e-commerce: orders & payments
-- ---------------------------------------------------------------------------

create sequence public.order_number_seq;

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references auth.users (id) on delete restrict,
  quote_id uuid references public.quote_requests (id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  currency text not null default 'INR',
  subtotal numeric(12, 2),
  tax numeric(12, 2),
  total numeric(12, 2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

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
    new.order_number := 'BH-O-' || year_part || '-' || seq_part;
  end if;
  return new;
end;
$$;

create trigger orders_set_order_number
before insert on public.orders
for each row execute function public.set_order_number();

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  variant_id uuid references public.product_variants (id) on delete set null,
  quantity int not null default 1 check (quantity > 0),
  unit_price numeric(12, 2),
  line_total numeric(12, 2),
  customization_data jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  provider text,
  amount numeric(12, 2),
  currency text not null default 'INR',
  status text not null default 'pending'
    check (status in ('pending', 'authorized', 'captured', 'failed', 'refunded')),
  provider_reference text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger payments_set_updated_at
before update on public.payments
for each row execute function public.set_updated_at();
