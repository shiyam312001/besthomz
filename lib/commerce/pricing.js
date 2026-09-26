import { rupeesToPaise, paiseToRupees } from "@/lib/commerce/money";
import { calculateShippingPaise } from "@/lib/commerce/shipping";
import { SHOW_PRICES, CHECKOUT_ENABLED } from "@/config/pricing";

const MAX_QTY = 99;

export function isCommercePricingAllowed() {
  return SHOW_PRICES || CHECKOUT_ENABLED;
}

export async function fetchActivePrices(admin, productIds) {
  if (!productIds.length) return {};
  const { data } = await admin
    .from("product_pricing")
    .select("product_id, variant_id, price, currency, is_active")
    .in("product_id", productIds)
    .eq("is_active", true);
  const map = {};
  for (const row of data || []) {
    const key = `${row.product_id}:${row.variant_id || ""}`;
    if (row.price != null) map[key] = row;
    if (!row.variant_id && row.price != null) map[`${row.product_id}:`] = row;
  }
  return map;
}

export function resolveUnitPricePaise(priceMap, productId, variantId) {
  const key = `${productId}:${variantId || ""}`;
  const fallback = `${productId}:`;
  const row = priceMap[key] || priceMap[fallback];
  if (!row?.price) return null;
  return rupeesToPaise(row.price);
}

/**
 * Build priced lines from server cart + DB products/pricing.
 * @returns {{ ok: boolean, error?: string, lines?: Array, subtotalPaise?: number }}
 */
export async function calculateCartPricing(admin, cartItems) {
  if (!isCommercePricingAllowed()) {
    return { ok: false, error: "Online checkout is not enabled." };
  }
  if (!cartItems?.length) {
    return { ok: false, error: "Your cart is empty." };
  }

  const productIds = [...new Set(cartItems.map((l) => l.product_id).filter(Boolean))];
  const { data: products } = await admin
    .from("products")
    .select("id, slug, name, sku, status")
    .in("id", productIds);

  const productMap = Object.fromEntries((products || []).map((p) => [p.id, p]));
  const priceMap = await fetchActivePrices(admin, productIds);

  const lines = [];
  let subtotalPaise = 0;

  for (const line of cartItems) {
    const product = productMap[line.product_id];
    if (!product || product.status !== "active") {
      return { ok: false, error: `“${line.products?.name || "An item"}” is no longer available.` };
    }
    const qty = Math.min(Math.max(1, Math.floor(Number(line.quantity) || 1)), MAX_QTY);
    const unitPaise = resolveUnitPricePaise(priceMap, line.product_id, line.variant_id);
    if (unitPaise == null || unitPaise <= 0) {
      return { ok: false, error: `Pricing is not available for ${product.name}. Request a quote instead.` };
    }
    const lineTotal = unitPaise * qty;
    subtotalPaise += lineTotal;
    lines.push({
      cart_item_id: line.id,
      product_id: line.product_id,
      variant_id: line.variant_id,
      product_name_snapshot: product.name,
      sku_snapshot: product.sku,
      quantity: qty,
      unit_price_paise: unitPaise,
      line_total_paise: lineTotal,
      customization_data: line.customization_data || {},
    });
  }

  const discountPaise = 0;
  const taxPaise = 0;
  const shippingPaise = calculateShippingPaise();
  const totalPaise = subtotalPaise - discountPaise + taxPaise + shippingPaise;

  if (totalPaise <= 0) {
    return { ok: false, error: "Order total must be greater than zero." };
  }

  return {
    ok: true,
    lines,
    subtotalPaise,
    discountPaise,
    taxPaise,
    shippingPaise,
    totalPaise,
    currency: "INR",
    subtotal: paiseToRupees(subtotalPaise),
    discount: paiseToRupees(discountPaise),
    tax: paiseToRupees(taxPaise),
    shipping: paiseToRupees(shippingPaise),
    total: paiseToRupees(totalPaise),
  };
}
