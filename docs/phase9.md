# Phase 9 — Checkout, Orders & Razorpay

## Objectives

- Optional ecommerce pricing (`SHOW_PRICES` / `CHECKOUT_ENABLED`)
- Server-side cart pricing and checkout
- Order creation before payment with immutable line snapshots
- Razorpay orders, client checkout, server signature verification
- Idempotent webhooks
- Customer and admin order management
- Quote → order conversion with approved total
- Preserve quote-first UX and luxury UI

## Architecture

- **Pricing:** `lib/commerce/pricing.js` loads `product_pricing` via admin/service role only.
- **Money:** Integer paise in calculations; rupees in DB columns where existing schema uses `numeric`.
- **Checkout:** `app/actions/checkout.js` (auth required) + `components/checkout/CheckoutView.jsx` (Razorpay launcher only).
- **Quote orders:** `app/actions/orders.js` for pay-now on converted quote orders.
- **Webhooks:** `app/api/payments/razorpay/webhook/route.js` (raw body + HMAC).
- **Razorpay:** `lib/payments/razorpay.js` (REST, no extra npm package).

## Pricing flag

- `config/pricing.js` — `SHOW_PRICES` (default `false`).
- `CHECKOUT_ENABLED` = `NEXT_PUBLIC_CHECKOUT_ENABLED=true` OR `SHOW_PRICES`.
- Customer catalog never reads `product_pricing` directly; RLS remains staff-only.

## Checkout flow

1. Authenticated user opens `/checkout`.
2. Server loads cart and `calculateCartPricing()`.
3. Pending order + items + payment row (`created`).
4. Razorpay order created server-side.
5. Client opens Razorpay Checkout.
6. `verifyCheckoutPayment` or webhook marks `paid` / order `confirmed`.
7. Purchased cart lines removed; success at `/order/success`.

## Order lifecycle

Statuses: `pending` → `confirmed` → `processing` → `ready` → `shipped` → `delivered` (or `cancelled` / `refunded`).  
Transitions enforced in `lib/orders/order-status.js` for admin updates.

Payment statuses are separate: `pending`, `created`, `paid`, `failed`, etc.

Order numbers: `BH-ORD-YYYY-######` (migration `010_phase9_commerce.sql`).

## Razorpay

- Env: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.
- Never expose secrets to the client or `NEXT_PUBLIC_*`.
- Missing credentials: friendly “Payment gateway is not configured”; quotes still work.

## Security

- No client-submitted totals or prices.
- Service role only in server actions, admin client, webhooks.
- Customers select own orders only; staff manage via RLS + `requireStaff()`.

## Database

Apply `supabase/migrations/010_phase9_commerce.sql` on your Supabase project.

## Routes

| Route | Purpose |
|-------|---------|
| `/checkout` | Checkout (noindex) |
| `/order/success` | Confirmation (noindex) |
| `/order/payment-failed` | Retry payment (noindex) |
| `/account/orders` | Customer list |
| `/account/orders/[id]` | Customer detail + pay quote order |
| `/admin/orders` | Staff list |
| `/admin/orders/[id]` | Staff detail |

## Quote → order

Admin: set **approved total**, status **approved**, **Convert to order** on `/admin/quotes/[id]`.  
Requires `user_id` on quote. Customer pays from account order detail.

## Testing

See Phase 9 spec test checklist (SHOW_PRICES, server totals, verification, webhook idempotency, RLS).

## Limitations

- No automatic refunds; admin can record refund status.
- No PDF invoices (data is invoice-ready via `lib/orders/order-format.js`).
- Email stubs only unless `EMAIL_PROVIDER` is configured.
- GST not hard-coded; tax remains 0 until configured.
- Guest checkout not supported (orders require `user_id`).
