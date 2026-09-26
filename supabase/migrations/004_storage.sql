-- Best Homz — Storage buckets & policies

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('products', 'products', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('categories', 'categories', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('rooms', 'rooms', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('collections', 'collections', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('offers', 'offers', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('showroom', 'showroom', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('site-assets', 'site-assets', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- Public read for catalog/media buckets
create policy "storage_public_read"
on storage.objects for select
to anon, authenticated
using (bucket_id in (
  'products', 'categories', 'rooms', 'collections', 'offers', 'showroom', 'site-assets', 'avatars'
));

-- Staff upload/update/delete
create policy "storage_staff_insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id in (
    'products', 'categories', 'rooms', 'collections', 'offers', 'showroom', 'site-assets', 'avatars'
  )
  and public.is_staff()
);

create policy "storage_staff_update"
on storage.objects for update
to authenticated
using (
  bucket_id in (
    'products', 'categories', 'rooms', 'collections', 'offers', 'showroom', 'site-assets', 'avatars'
  )
  and public.is_staff()
);

create policy "storage_staff_delete"
on storage.objects for delete
to authenticated
using (
  bucket_id in (
    'products', 'categories', 'rooms', 'collections', 'offers', 'showroom', 'site-assets', 'avatars'
  )
  and public.is_staff()
);

-- Users may upload their own avatar
create policy "storage_avatar_user_upload"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "storage_avatar_user_update"
on storage.objects for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);
