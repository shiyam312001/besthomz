# Phase 8 — Production polish, admin completion, security & commerce hardening

## 1. Phase 8 objectives

Complete unfinished Phase 7 work, harden guest commerce, finish admin CRUD surfaces, improve customer account UX, validate security/RLS posture, add SEO/sitemap/robots, loading states, and production documentation — **without** checkout, payments, or pricing in the customer UI (`SHOW_PRICES = false`).

## 2. Features completed

### Guest commerce
- **Cart:** `bh_cart_session` httpOnly cookie; server actions + service role for guest persistence; merge on login with quantity combine via unique index (008).
- **Wishlist:** `bh_wishlist_slugs` localStorage; merge on login/signup; `GuestCommerceSync` clears local storage and refreshes counts.
- **Quote claim:** `bh_quote_claim` httpOnly cookie + `quote_requests.guest_claim_token` (009); `claimGuestQuotesForUser()` on auth; token nulled after claim; no client-supplied quote IDs.

### Customer
- Account dashboard with real counts, profile card, empty-state hints.
- Quote list/detail with timeline, next-step copy, no internal fields.
- Cart → Request Quote via `QuoteDrawer` and multi-line `quote_items`.
- Compare (max 4), recently viewed (max 10, stale slug prune), search with count/clear.
- WhatsApp via `config/site.js` only.

### Admin
- **Products:** CRUD, slug validation, archive/restore, images (upload/primary/delete, 10MB, jpeg/png/webp).
- **Categories / subcategories / rooms / offers / FAQs:** list + create/edit (FAQs delete with `ConfirmDialog`).
- **Collections:** edit + product picker (search, add/remove, order).
- **Quotes:** list filters, detail, status actions, internal notes (staff only).
- **Reviews:** approve/reject/delete with confirm.
- **Customers:** quote counts.
- **Offers:** schedule labels (Active / Upcoming / Expired / Inactive).
- **`ConfirmDialog`** — no `window.confirm`.

### SEO
- `lib/seo/metadata.js`, `app/sitemap.js`, `app/robots.js`, dynamic product metadata.

## 3. Customer changes (summary)

See routes under `app/(site)/` for cart, wishlist, compare, account/*, auth under `app/(auth)/`.

## 4. Admin changes (summary)

New edit/new routes: `subcategories`, `rooms`, `offers`, `faqs`, existing `categories`, `collections/[id]/edit`, `products/*`.

## 5. Database migrations

| Migration | Purpose |
|-----------|---------|
| `008_phase7_notes_and_cart_unique.sql` | Internal notes, `is_internal` on history, cart line uniqueness |
| `009_phase8_guest_quote_claim.sql` | `guest_claim_token` on `quote_requests` |

Do not edit applied migrations.

## 6. Guest commerce flow

1. Guest actions use cookies (`bh_cart_session`, `bh_quote_claim`) — not readable from JS.
2. Server actions validate input; service role only server-side.
3. Login/signup: cart merge → wishlist merge → quote claim.

## 7. Quote claim flow

1. Guest submits quote → `getOrCreateQuoteClaimToken()` sets cookie + DB token.
2. Login/signup → `claimGuestQuotesForUser()` matches token, sets `user_id`, clears token + cookie.
3. Customer sees quotes at `/account/quotes` only when `user_id` matches session.

## 8. RLS changes

**None in Phase 8.** Existing Phase 4 policies remain. Guest cart/claim uses service role in controlled server actions, not weakened RLS.

## 9. Security decisions

- `lib/supabase/admin.js` only imported from server actions (`cart`, `guest-quotes`, `quotes` cart convert).
- `requireAuth()` / `requireStaff()` on account/admin layouts.
- Quote/profile validation in `lib/validation/forms.js`.
- Customer quote queries exclude `internal_notes`; timeline filters `is_internal`.

## 10. Storage

Staff upload to `products` bucket via authenticated Supabase client (RLS `storage_staff_*`). MIME and size validated in `app/actions/admin/images.js`.

## 11. SEO changes

Canonical, Open Graph, Twitter; sitemap for active catalog; robots disallow private routes.

## 12. Performance

Server Components by default; `loading.js` on cart and admin; avoid duplicate fetches in account dashboard via `Promise.all`.

## 13. Responsive QA

Manual checklist: 390–1440px on customer shell (header, bottom nav, cart, PDP sticky bar) and admin tables (horizontal scroll).

## 14. Environment variables

| Variable | Scope |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public |
| `NEXT_PUBLIC_SITE_URL` | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** |

See `.env.example`.

## 15. Testing checklist

- [ ] Tests 1–8 (customer flows in Phase 8 prompt)
- [ ] Tests 9–16 (admin flows)
- [ ] Security: anonymous → `/admin`; cross-user quote access → 404
- [ ] `npm run build`

## 16. Remaining limitations

- Product image **drag reorder** UI not implemented (server `adminReorderProductImages` exists).
- Category/room/offer **binary upload** uses URL fields; product images use Storage.
- Collection **create** page not separate (create via DB seed or add collection form later).
- Checkout, payments, Razorpay, Stripe — **Phase 9+**.
- No invented SKU/materials/colours on PDP when DB empty.
