-- Phase 7: internal staff notes, cart line uniqueness, customer-safe quote history

alter table public.quote_requests
  add column if not exists internal_notes text;

alter table public.customizations
  add column if not exists internal_notes text;

alter table public.quote_status_history
  add column if not exists is_internal boolean not null default false;

comment on column public.quote_requests.internal_notes is 'Staff-only; never expose to customers';
comment on column public.customizations.internal_notes is 'Staff-only; never expose to customers';
comment on column public.quote_status_history.is_internal is 'When true, note is hidden from customer quote timeline';

-- Merge duplicate cart lines (same product + variant) on guest/user carts
create unique index if not exists idx_cart_items_cart_product_variant
  on public.cart_items (
    cart_id,
    product_id,
    coalesce(variant_id, '00000000-0000-0000-0000-000000000000'::uuid)
  );
