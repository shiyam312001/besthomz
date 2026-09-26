-- Editorial rooms & collections (manifest assets; no invented product links)

insert into public.rooms (name, slug, description, hero_image, sort_order, is_active)
values
  ('Living Room', 'living-room', 'Sofas, tables & more for relaxed living.', '/BestHomz/Homepage/rooms/17-room-living.png', 1, true),
  ('Bedroom', 'bedroom', 'Beds, wardrobes & comfort essentials.', '/BestHomz/Homepage/rooms/18-room-bedroom.png', 2, true),
  ('Dining Room', 'dining-room', 'Tables, chairs & storage for shared meals.', '/BestHomz/Homepage/rooms/19-room-dining.png', 3, true),
  ('Home Office', 'home-office', 'Desks, chairs & storage for productive work.', '/BestHomz/Homepage/rooms/20-room-office.png', 4, true),
  ('Kids Room', 'kids-room', 'Functional furniture for growing spaces.', '/BestHomz/Homepage/rooms/21-room-kids.png', 5, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  hero_image = excluded.hero_image,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.collections (name, slug, description, hero_image, is_featured, sort_order, is_active)
values
  ('Modern Living', 'modern-living', 'Clean lines and calm living spaces.', '/BestHomz/Homepage/inspiration/30-inspire-living.png', true, 1, true),
  ('Bedroom Collection', 'bedroom-collection', 'Restful, refined bedroom essentials.', '/BestHomz/Homepage/inspiration/31-inspire-bedroom.png', true, 2, true),
  ('Office Collection', 'office-collection', 'Productive, premium workspaces.', '/BestHomz/Homepage/inspiration/33-inspire-office.png', false, 3, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  hero_image = excluded.hero_image,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();
