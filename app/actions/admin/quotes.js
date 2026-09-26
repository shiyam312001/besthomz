"use server";

import { revalidatePath } from "next/cache";
import { getStaffSupabase } from "@/lib/auth/staff";
import { updateQuoteStatus, updateQuoteInternalNotes } from "@/lib/services/quotes";

const STATUSES = [
  "new",
  "contacted",
  "requirement_confirmed",
  "quote_prepared",
  "awaiting_customer",
  "approved",
  "rejected",
  "converted_to_order",
  "closed",
];

export async function adminUpdateQuoteStatus(quoteId, status) {
  if (!STATUSES.includes(status)) return { ok: false, error: "Invalid status" };
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { error } = await updateQuoteStatus(supabase, quoteId, status);
  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/quotes/${quoteId}`);
  revalidatePath("/admin/quotes");
  return { ok: true };
}

export async function adminSaveQuoteNotes(quoteId, notes) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { error } = await updateQuoteInternalNotes(supabase, quoteId, notes);
  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/quotes/${quoteId}`);
  return { ok: true };
}

export async function adminSetQuoteApprovedTotal(quoteId, formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const raw = formData.get("approved_total")?.toString().trim();
  const approved_total = raw ? Number(raw) : null;
  if (approved_total != null && (!Number.isFinite(approved_total) || approved_total <= 0)) {
    return { ok: false, error: "Enter a valid approved total." };
  }
  const { error } = await supabase.from("quote_requests").update({ approved_total }).eq("id", quoteId);
  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/quotes/${quoteId}`);
  return { ok: true };
}

export async function adminConvertQuoteToOrder(quoteId) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { data: quote } = await supabase
    .from("quote_requests")
    .select("id, user_id, status, approved_total, full_name, phone, email, location")
    .eq("id", quoteId)
    .maybeSingle();

  if (!quote) return { ok: false, error: "Quote not found." };
  if (quote.status !== "approved") {
    return { ok: false, error: "Only approved quotes can be converted to an order." };
  }
  if (!quote.user_id) {
    return { ok: false, error: "Quote must be linked to a customer account before conversion." };
  }
  if (!quote.approved_total || quote.approved_total <= 0) {
    return { ok: false, error: "Set an approved total before converting." };
  }

  const { data: existing } = await supabase.from("orders").select("id").eq("quote_id", quoteId).maybeSingle();
  if (existing?.id) return { ok: false, error: "An order already exists for this quote.", orderId: existing.id };

  const { data: items } = await supabase
    .from("quote_items")
    .select("*, products(id, name, sku)")
    .eq("quote_id", quoteId);

  const total = Number(quote.approved_total);
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      user_id: quote.user_id,
      quote_id: quoteId,
      status: "pending",
      payment_status: "pending",
      currency: "INR",
      subtotal: total,
      tax: 0,
      discount: 0,
      shipping: 0,
      total,
      billing_address: { name: quote.full_name, phone: quote.phone, email: quote.email, location: quote.location },
      shipping_address: { name: quote.full_name, phone: quote.phone },
    })
    .select("id, order_number")
    .single();

  if (orderErr || !order) return { ok: false, error: orderErr?.message || "Could not create order." };

  const orderItems = (items || []).map((item) => {
    const unit = item.quoted_price ?? item.unit_price ?? 0;
    const qty = item.quantity || 1;
    return {
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      product_name_snapshot: item.products?.name || item.customer_note || "Quoted item",
      sku_snapshot: item.products?.sku || null,
      quantity: qty,
      unit_price: unit,
      line_total: unit * qty,
      customization_data: item.customization_data || {},
    };
  });

  if (orderItems.length) {
    await supabase.from("order_items").insert(orderItems);
  }

  await updateQuoteStatus(supabase, quoteId, "converted_to_order");
  revalidatePath(`/admin/quotes/${quoteId}`);
  revalidatePath(`/admin/orders/${order.id}`);
  revalidatePath("/admin/orders");
  return { ok: true, orderId: order.id, orderNumber: order.order_number };
}
