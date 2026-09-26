const TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["ready", "cancelled"],
  ready: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
  refunded: [],
};

export function canTransitionOrderStatus(from, to) {
  if (!from || !to || from === to) return false;
  const allowed = TRANSITIONS[from];
  return Array.isArray(allowed) && allowed.includes(to);
}

export const ORDER_TIMELINE = [
  { key: "pending", label: "Order placed" },
  { key: "confirmed", label: "Payment confirmed" },
  { key: "processing", label: "Processing" },
  { key: "ready", label: "Ready" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];
