-- Best Homz — Row Level Security

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.materials enable row level security;
alter table public.colours enable row level security;
alter table public.finishes enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_features enable row level security;
alter table public.product_specifications enable row level security;
alter table public.product_pricing enable row level security;
alter table public.rooms enable row level security;
alter table public.collections enable row level security;
alter table public.collection_products enable row level security;
alter table public.offers enable row level security;
alter table public.wishlists enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.quote_requests enable row level security;
alter table public.quote_items enable row level security;
alter table public.quote_status_history enable row level security;
alter table public.customizations enable row level security;
alter table public.customization_items enable row level security;
alter table public.showroom_visits enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.reviews enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------

create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_staff());

create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy "profiles_insert_staff"
on public.profiles for insert
to authenticated
with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Public catalog read (active / published)
-- ---------------------------------------------------------------------------

create policy "categories_public_read"
on public.categories for select
to anon, authenticated
using (is_active = true);

create policy "categories_staff_write"
on public.categories for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "subcategories_public_read"
on public.subcategories for select
to anon, authenticated
using (is_active = true);

create policy "subcategories_staff_write"
on public.subcategories for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "materials_public_read"
on public.materials for select
to anon, authenticated
using (is_active = true);

create policy "materials_staff_write"
on public.materials for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "colours_public_read"
on public.colours for select
to anon, authenticated
using (is_active = true);

create policy "colours_staff_write"
on public.colours for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "finishes_public_read"
on public.finishes for select
to anon, authenticated
using (is_active = true);

create policy "finishes_staff_write"
on public.finishes for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "products_public_read"
on public.products for select
to anon, authenticated
using (status = 'active');

create policy "products_staff_write"
on public.products for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "product_images_public_read"
on public.product_images for select
to anon, authenticated
using (
  exists (
    select 1 from public.products p
    where p.id = product_id and p.status = 'active'
  )
);

create policy "product_images_staff_write"
on public.product_images for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "product_variants_public_read"
on public.product_variants for select
to anon, authenticated
using (
  is_active = true
  and exists (
    select 1 from public.products p
    where p.id = product_id and p.status = 'active'
  )
);

create policy "product_variants_staff_write"
on public.product_variants for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "product_features_public_read"
on public.product_features for select
to anon, authenticated
using (
  exists (
    select 1 from public.products p
    where p.id = product_id and p.status = 'active'
  )
);

create policy "product_features_staff_write"
on public.product_features for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "product_specs_public_read"
on public.product_specifications for select
to anon, authenticated
using (
  exists (
    select 1 from public.products p
    where p.id = product_id and p.status = 'active'
  )
);

create policy "product_specs_staff_write"
on public.product_specifications for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

-- Pricing hidden from public until enabled in app config (no anon read)
create policy "product_pricing_staff_only"
on public.product_pricing for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "rooms_public_read"
on public.rooms for select
to anon, authenticated
using (is_active = true);

create policy "rooms_staff_write"
on public.rooms for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "collections_public_read"
on public.collections for select
to anon, authenticated
using (is_active = true);

create policy "collections_staff_write"
on public.collections for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "collection_products_public_read"
on public.collection_products for select
to anon, authenticated
using (
  exists (
    select 1 from public.collections c
    where c.id = collection_id and c.is_active = true
  )
);

create policy "collection_products_staff_write"
on public.collection_products for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "offers_public_read"
on public.offers for select
to anon, authenticated
using (
  is_active = true
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);

create policy "offers_staff_write"
on public.offers for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "faqs_public_read"
on public.faqs for select
to anon, authenticated
using (is_active = true);

create policy "faqs_staff_write"
on public.faqs for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "site_settings_public_read"
on public.site_settings for select
to anon, authenticated
using (is_public = true);

create policy "site_settings_staff_write"
on public.site_settings for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- Reviews (public reads approved only)
-- ---------------------------------------------------------------------------

create policy "reviews_public_read_approved"
on public.reviews for select
to anon, authenticated
using (status = 'approved');

create policy "reviews_insert_own"
on public.reviews for insert
to authenticated
with check (user_id = auth.uid());

create policy "reviews_update_own_or_staff"
on public.reviews for update
to authenticated
using (user_id = auth.uid() or public.is_staff())
with check (user_id = auth.uid() or public.is_staff());

create policy "reviews_delete_staff"
on public.reviews for delete
to authenticated
using (public.is_staff());

-- ---------------------------------------------------------------------------
-- Wishlists
-- ---------------------------------------------------------------------------

create policy "wishlists_select_own"
on public.wishlists for select
to authenticated
using (user_id = auth.uid() or public.is_staff());

create policy "wishlists_insert_own"
on public.wishlists for insert
to authenticated
with check (user_id = auth.uid());

create policy "wishlists_update_own"
on public.wishlists for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "wishlists_delete_own"
on public.wishlists for delete
to authenticated
using (user_id = auth.uid() or public.is_staff());

create policy "wishlist_items_select_own"
on public.wishlist_items for select
to authenticated
using (
  exists (
    select 1 from public.wishlists w
    where w.id = wishlist_id and (w.user_id = auth.uid() or public.is_staff())
  )
);

create policy "wishlist_items_insert_own"
on public.wishlist_items for insert
to authenticated
with check (
  exists (
    select 1 from public.wishlists w
    where w.id = wishlist_id and w.user_id = auth.uid()
  )
);

create policy "wishlist_items_delete_own"
on public.wishlist_items for delete
to authenticated
using (
  exists (
    select 1 from public.wishlists w
    where w.id = wishlist_id and w.user_id = auth.uid()
  )
);

-- ---------------------------------------------------------------------------
-- Carts
-- ---------------------------------------------------------------------------

create policy "carts_select_own"
on public.carts for select
to authenticated
using (user_id = auth.uid() or public.is_staff());

create policy "carts_insert_own"
on public.carts for insert
to authenticated
with check (user_id = auth.uid());

create policy "carts_update_own"
on public.carts for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "cart_items_via_cart"
on public.cart_items for all
to authenticated
using (
  exists (
    select 1 from public.carts c
    where c.id = cart_id and (c.user_id = auth.uid() or public.is_staff())
  )
)
with check (
  exists (
    select 1 from public.carts c
    where c.id = cart_id and c.user_id = auth.uid()
  )
);

-- ---------------------------------------------------------------------------
-- Quotes
-- ---------------------------------------------------------------------------

create policy "quotes_select_own"
on public.quote_requests for select
to authenticated
using (user_id = auth.uid() or public.is_staff());

create policy "quotes_insert"
on public.quote_requests for insert
to anon, authenticated
with check (
  user_id is null
  or user_id = auth.uid()
  or public.is_staff()
);

create policy "quotes_update_staff"
on public.quote_requests for update
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "quote_items_select"
on public.quote_items for select
to authenticated
using (
  exists (
    select 1 from public.quote_requests q
    where q.id = quote_id and (q.user_id = auth.uid() or public.is_staff())
  )
);

create policy "quote_items_insert"
on public.quote_items for insert
to anon, authenticated
with check (
  exists (
    select 1 from public.quote_requests q
    where q.id = quote_id
      and (q.user_id = auth.uid() or q.user_id is null or public.is_staff())
  )
);

create policy "quote_items_staff_manage"
on public.quote_items for update
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "quote_history_select"
on public.quote_status_history for select
to authenticated
using (
  exists (
    select 1 from public.quote_requests q
    where q.id = quote_id and (q.user_id = auth.uid() or public.is_staff())
  )
);

create policy "quote_history_staff_insert"
on public.quote_status_history for insert
to authenticated
with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- Customizations
-- ---------------------------------------------------------------------------

create policy "customizations_select_own"
on public.customizations for select
to authenticated
using (user_id = auth.uid() or public.is_staff());

create policy "customizations_insert_own"
on public.customizations for insert
to authenticated
with check (user_id = auth.uid() or user_id is null);

create policy "customizations_update_own_or_staff"
on public.customizations for update
to authenticated
using (user_id = auth.uid() or public.is_staff())
with check (user_id = auth.uid() or public.is_staff());

create policy "customization_items_via_parent"
on public.customization_items for all
to authenticated
using (
  exists (
    select 1 from public.customizations c
    where c.id = customization_id and (c.user_id = auth.uid() or public.is_staff())
  )
)
with check (
  exists (
    select 1 from public.customizations c
    where c.id = customization_id and (c.user_id = auth.uid() or c.user_id is null)
  )
);

-- ---------------------------------------------------------------------------
-- Showroom & contact
-- ---------------------------------------------------------------------------

create policy "showroom_select_own"
on public.showroom_visits for select
to authenticated
using (user_id = auth.uid() or public.is_staff());

create policy "showroom_insert"
on public.showroom_visits for insert
to anon, authenticated
with check (user_id is null or user_id = auth.uid());

create policy "showroom_update_staff"
on public.showroom_visits for update
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "contact_insert"
on public.contact_messages for insert
to anon, authenticated
with check (true);

create policy "contact_staff_read"
on public.contact_messages for select
to authenticated
using (public.is_staff());

create policy "contact_staff_update"
on public.contact_messages for update
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "newsletter_insert"
on public.newsletter_subscribers for insert
to anon, authenticated
with check (true);

create policy "newsletter_staff_read"
on public.newsletter_subscribers for select
to authenticated
using (public.is_staff());

create policy "newsletter_staff_update"
on public.newsletter_subscribers for update
to authenticated
using (public.is_staff())
with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- Orders & payments (future — customer own, staff all)
-- ---------------------------------------------------------------------------

create policy "orders_select_own"
on public.orders for select
to authenticated
using (user_id = auth.uid() or public.is_staff());

create policy "orders_staff_write"
on public.orders for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "order_items_select"
on public.order_items for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or public.is_staff())
  )
);

create policy "order_items_staff_write"
on public.order_items for all
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "payments_select_own"
on public.payments for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or public.is_staff())
  )
);

create policy "payments_staff_write"
on public.payments for all
to authenticated
using (public.is_staff())
with check (public.is_staff());
