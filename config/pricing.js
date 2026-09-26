/** When true, customer UI may show prices and standard buy flows. */
export const SHOW_PRICES = false;

/** Checkout UI when true or when SHOW_PRICES is enabled. */
export const CHECKOUT_ENABLED =
  process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true" || SHOW_PRICES;

/** Server-side Razorpay configured (never expose secret). */
export function isPaymentsConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

/** Public Razorpay key for checkout launcher only. */
export function getRazorpayKeyId() {
  return process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
}
