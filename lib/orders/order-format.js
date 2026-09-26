import { formatInrFromRupees } from "@/lib/commerce/money";

export function formatOrderSummary(order) {
  if (!order) return null;
  return {
    orderNumber: order.order_number,
    status: order.status,
    paymentStatus: order.payment_status,
    createdAt: order.created_at,
    currency: order.currency || "INR",
    subtotal: order.subtotal,
    discount: order.discount,
    tax: order.tax,
    shipping: order.shipping,
    total: order.total,
    totalDisplay: order.total != null ? formatInrFromRupees(order.total) : null,
    billing: order.billing_address,
    shippingAddress: order.shipping_address,
    items: (order.order_items || []).map((item) => ({
      name: item.product_name_snapshot || "Item",
      sku: item.sku_snapshot,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      lineTotal: item.line_total,
    })),
  };
}
