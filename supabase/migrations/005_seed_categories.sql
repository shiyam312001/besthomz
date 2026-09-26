-- Seed: 8 core categories from Phase 2 asset manifest (no products/prices/reviews)

insert into public.categories (name, slug, description, image_url, sort_order, is_active)
values
  (
    'Dining Table',
    'dining-tables',
    'Premium dining tables for family gatherings and everyday meals.',
    '/BestHomz/Homepage/categories/02-category-dining-table.png',
    1,
    true
  ),
  (
    'Dining Chair',
    'dining-chairs',
    'Comfortable dining chairs to complement your table.',
    '/BestHomz/Homepage/categories/03-category-dining-chair.png',
    2,
    true
  ),
  (
    'Dressing Table',
    'dressing-tables',
    'Elegant dressing tables for bedroom storage and style.',
    '/BestHomz/Homepage/categories/04-category-dressing-table.png',
    3,
    true
  ),
  (
    'Bed',
    'beds',
    'Beds designed for rest, storage, and modern bedrooms.',
    '/BestHomz/Homepage/categories/05-category-bed.png',
    4,
    true
  ),
  (
    'Mattress',
    'mattresses',
    'Supportive mattresses for better sleep.',
    '/BestHomz/Homepage/categories/06-category-mattress.png',
    5,
    true
  ),
  (
    'Sofa',
    'sofas',
    'Sofas crafted for comfort and contemporary living rooms.',
    '/BestHomz/Homepage/categories/07-category-sofa.png',
    6,
    true
  ),
  (
    'Office Chair',
    'office-chairs',
    'Ergonomic office chairs for productive workspaces.',
    '/BestHomz/Homepage/categories/08-category-office-chair.png',
    7,
    true
  ),
  (
    'Office Table',
    'office-tables',
    'Office tables and desks for home and workplace.',
    '/BestHomz/Homepage/categories/09-category-office-table.png',
    8,
    true
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

-- Default public site flags (pricing visibility remains in config/pricing.js)
insert into public.site_settings (key, value, description, is_public)
values
  (
    'commerce',
    '{"show_prices": false, "checkout_enabled": false}'::jsonb,
    'Commerce feature flags mirror app config; UI uses config/pricing.js',
    false
  )
on conflict (key) do nothing;
