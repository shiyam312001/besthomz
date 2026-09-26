import { paiseToRupees } from "@/lib/commerce/money";

export async function getOrdersForUser(supabase, userId) {
  return supabase
    .from("orders")
    .select("id, order_number, status, payment_status, total, currency, created_at, updated_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

export async function getOrderByIdForUser(supabase, orderId, userId) {
  return supabase
    .from("orders")
    .select(
      `*,
      order_items(*),
      payments(*),
      order_status_history(id, old_status, new_status, created_at)`,
    )
    .eq("id", orderId)
    .eq("user_id", userId)
    .maybeSingle();
}

export async function getOrderByIdStaff(supabase, orderId) {
  return supabase
    .from("orders")
    .select(`*, order_items(*), payments(*), order_status_history(*)`)
    .eq("id", orderId)
    .maybeSingle();
}

export function orderLineFromPricingLine(line) {
  return {
    product_id: line.product_id,
    variant_id: line.variant_id,
    product_name_snapshot: line.product_name_snapshot,
    sku_snapshot: line.sku_snapshot,
    quantity: line.quantity,
    unit_price: paiseToRupees(line.unit_price_paise),
    line_total: paiseToRupees(line.line_total_paise),
    customization_data: line.customization_data || {},
  };
}
