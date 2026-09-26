# Phase 7 — Customer commerce & admin

## Features

### Customer
- `/cart` — guest session cart (httpOnly `bh_cart_session`) + logged-in cart via Supabase; quote CTA from cart
- `/wishlist` — logged-in DB wishlist; guests use `localStorage` slug list with merge on login
- `/account/*` — dashboard, profile, quotes, customizations, showroom visits, orders placeholder
- `/login`, `/signup`, `/forgot-password`, `/reset-password` — Supabase Auth (email/password)
- `/compare` — up to 4 products in `localStorage`
- Recently viewed — `localStorage`, max 10, on PDP
- Product share — Web Share API + copy URL toast; WhatsApp via `config/site.js`
- Search — result count on `/search?q=`

### Admin (`/admin/*`)
- Staff/admin only (`profiles.role` in `staff`|`admin`), enforced in `app/admin/layout.js`
- Dashboard, products (list/new/edit), categories, subcategories, rooms, collections, offers
- Quotes (list, detail, status actions, internal notes)
- Customizations, showroom visits, customers, reviews moderation, FAQs, contact messages, settings (read `site_settings`)

## Routes

See `app/(site)/`, `app/(auth)/`, `app/admin/` in the repo.

## Database changes

`supabase/migrations/008_phase7_notes_and_cart_unique.sql`:
- `quote_requests.internal_notes` (staff-only)
- `customizations.internal_notes` (staff-only)
- `quote_status_history.is_internal` (hide note from customer timeline)
- Unique index on `cart_items (cart_id, product_id, variant)`

## RLS

No policy changes in 008. Guest carts use **server actions** + `SUPABASE_SERVICE_ROLE_KEY` (server-only) scoped by session cookie. Authenticated carts use anon client + existing RLS.

## Auth flow

1. Sign up → `handle_new_user` creates `profiles` row (`customer`)
2. Login → `mergeGuestCartOnLogin`, optional guest wishlist merge from form hidden field
3. Admin: set `profiles.role = 'admin'` or `'staff'` in SQL for a user id

## Cart behavior

- Guest: `getOrCreateCartSessionId()` cookie → admin client finds/creates `carts.session_id`
- User: `carts.user_id` via user Supabase client
- Merge on login: combine line quantities, abandon guest cart

## Wishlist behavior

- Auth: `wishlists` / `wishlist_items`
- Guest: `bh_wishlist_slugs` in localStorage; `mergeGuestWishlist(slugs)` on login

## Quote behavior

- Single product, cart lines (`cart_items` JSON in form), `user_id` when logged in
- Cart marked `converted` after successful cart quote
- Customer quote detail excludes `internal_notes`; timeline filters `is_internal` notes

## Security

- Never import `lib/supabase/admin.js` in client components
- `user_id` / quote ownership verified server-side (`quote.user_id === auth user`)
- Staff operations via `getStaffSupabase()` (RLS + role check)

## Environment

- Existing: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Required for guest cart server persistence:** `SUPABASE_SERVICE_ROLE_KEY`
- Optional: `NEXT_PUBLIC_SITE_URL` for password reset emails

## Testing checklist

- [ ] Sign up / login / logout / reset password
- [ ] Guest cart add → login merge
- [ ] Request quote from product and cart
- [ ] Account quotes list + detail timeline
- [ ] Showroom visit submit
- [ ] Compare + recently viewed + share/WhatsApp
- [ ] Admin login as staff; dashboard counts
- [ ] Quote status update + internal notes
- [ ] `npm run build`

## Limitations

- No checkout, payments, or order processing
- Admin CRUD for categories/collections/etc. is primarily **list + product forms**; full image upload/reorder UI not exhaustive
- Product image upload to Storage: schema/policies exist; dedicated admin uploader minimal in this phase
- Guest quotes without login are not linked to account retroactively
