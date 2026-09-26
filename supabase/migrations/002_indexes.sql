-- Best Homz — performance indexes

create index idx_products_slug on public.products (slug);
create index idx_products_category_id on public.products (category_id);
create index idx_products_subcategory_id on public.products (subcategory_id);
create index idx_products_status on public.products (status);
create index idx_products_is_featured on public.products (is_featured) where is_featured = true;
create index idx_products_is_new on public.products (is_new) where is_new = true;
create index idx_products_is_bestseller on public.products (is_bestseller) where is_bestseller = true;
create index idx_products_created_at on public.products (created_at desc);

create index idx_categories_slug on public.categories (slug);
create index idx_categories_active_sort on public.categories (is_active, sort_order);

create index idx_subcategories_category_id on public.subcategories (category_id);
create index idx_subcategories_slug on public.subcategories (slug);

create index idx_product_images_product_id on public.product_images (product_id);
create index idx_product_images_primary on public.product_images (product_id) where is_primary = true;

create index idx_product_variants_product_id on public.product_variants (product_id);

create index idx_collection_products_product on public.collection_products (product_id);

create index idx_quote_requests_status on public.quote_requests (status);
create index idx_quote_requests_user_id on public.quote_requests (user_id);
create index idx_quote_requests_created_at on public.quote_requests (created_at desc);

create index idx_quote_items_quote_id on public.quote_items (quote_id);

create index idx_cart_items_cart_id on public.cart_items (cart_id);

-- Prevent duplicate lines when variant_id is null
create unique index idx_cart_items_unique_line on public.cart_items (
  cart_id,
  product_id,
  coalesce(variant_id, '00000000-0000-0000-0000-000000000000'::uuid)
);
create index idx_carts_user_id on public.carts (user_id);
create index idx_carts_session_id on public.carts (session_id) where session_id is not null;

create index idx_wishlist_items_wishlist_id on public.wishlist_items (wishlist_id);

create index idx_showroom_visits_status on public.showroom_visits (status);
create index idx_showroom_visits_preferred_date on public.showroom_visits (preferred_date);

create index idx_reviews_product_status on public.reviews (product_id, status);
create index idx_offers_active on public.offers (is_active, starts_at, ends_at);

create index idx_product_pricing_product on public.product_pricing (product_id) where is_active = true;
