import { rupeesToPaise, paiseToRupees } from "@/lib/commerce/money";

/**
 * Shipping rules — no invented rates.
 * Set BH_SHIPPING_FLAT_PAISE (integer paise) in env for flat shipping; otherwise free.
 */
export function calculateShippingPaise() {
  const raw = process.env.BH_SHIPPING_FLAT_PAISE;
  if (raw) {
    const paise = parseInt(raw, 10);
    if (Number.isFinite(paise) && paise > 0) return paise;
  }
  return 0;
}

export function shippingLabel() {
  const paise = calculateShippingPaise();
  if (paise === 0) return "Free delivery (configured)";
  return `Flat shipping ₹${paiseToRupees(paise).toLocaleString("en-IN")}`;
}
