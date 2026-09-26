"use server";

import { createClientOptional } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/auth/server";
import { createQuoteRequest, addQuoteItems } from "@/lib/services/quotes";
import { markCartConverted } from "@/lib/services/cart";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCartSessionId } from "@/lib/session/cart-session";
import { getActiveCartForSession, getActiveCartForUser } from "@/lib/services/cart";
import { validateQuotePayload } from "@/lib/validation/forms";
import { getOrCreateQuoteClaimToken } from "@/lib/session/quote-claim";

function parseCartItemsJson(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function isUuid(id) {
  return typeof id === "string" && /^[0-9a-f-]{36}$/i.test(id);
}

export async function submitQuoteRequest(formData) {
  const user = await getAuthUser();
  const validated = validateQuotePayload({
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    location: formData.get("location"),
    furniture_requirement: formData.get("furniture_requirement"),
    customization_requirement: formData.get("customization_requirement"),
    room_size: formData.get("room_size"),
    budget_range: formData.get("budget_range"),
    preferred_contact_method: formData.get("preferred_contact_method"),
    message: formData.get("message"),
  });

  if (!validated.ok) {
    return { ok: false, error: validated.error };
  }

  const payload = {
    ...validated.data,
    user_id: user?.id ?? null,
    guest_claim_token: null,
  };

  if (!user) {
    payload.guest_claim_token = await getOrCreateQuoteClaimToken();
  }

  const supabase = await createClientOptional();
  if (!supabase) {
    return { ok: false, error: "Unable to connect. Please call us directly." };
  }

  const { data: quote, error } = await createQuoteRequest(supabase, payload);
  if (error) {
    return { ok: false, error: "We could not submit your request. Please try again or call us." };
  }

  const items = [];
  const cartItemsJson = formData.get("cart_items")?.toString();
  const cartItems = parseCartItemsJson(cartItemsJson);
  for (const line of cartItems) {
    if (!line.product_id && !line.product_name) continue;
    const pid = line.product_id?.startsWith("import-") ? null : line.product_id;
    if (pid && !isUuid(pid)) continue;
    items.push({
      product_id: pid,
      variant_id: line.variant_id && isUuid(line.variant_id) ? line.variant_id : null,
      quantity: line.quantity > 0 ? Math.min(line.quantity, 99) : 1,
      customer_note: line.product_name?.toString().slice(0, 500) || null,
    });
  }

  const productId = formData.get("product_id")?.toString();
  const quantity = Number(formData.get("quantity") || 1);
  if (productId && !cartItems.length) {
    items.push({
      product_id: productId.startsWith("import-") ? null : isUuid(productId) ? productId : null,
      quantity: quantity > 0 ? Math.min(quantity, 99) : 1,
      customer_note: formData.get("product_name")?.toString().slice(0, 500) || null,
    });
  }

  if (items.length && quote?.id) {
    await addQuoteItems(supabase, quote.id, items);
  }

  const fromCart = formData.get("from_cart")?.toString() === "1";
  if (fromCart && quote?.id) {
    try {
      if (user) {
        const { data: cart } = await getActiveCartForUser(supabase, user.id);
        if (cart?.id) await markCartConverted(supabase, cart.id);
      } else {
        const admin = createAdminClient();
        const sessionId = await getCartSessionId();
        if (sessionId) {
          const { data: cart } = await getActiveCartForSession(admin, sessionId);
          if (cart?.id) await markCartConverted(admin, cart.id);
        }
      }
    } catch {
      /* optional */
    }
  }

  return { ok: true, quoteNumber: quote.quote_number, quoteId: quote.id };
}
