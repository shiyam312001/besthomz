export const STAFF_ROLES = [
  "staff",
  "admin",
  "super_admin",
  "order_manager",
  "product_manager",
  "customer_support",
];

export const ADMIN_ROLES = ["admin", "super_admin"];

const ROLE_PERMISSIONS = {
  super_admin: ["*"],
  admin: ["*"],
  staff: [
    "dashboard.read",
    "products.read",
    "orders.read",
    "quotes.read",
    "customers.read",
    "quotes.write",
    "orders.write",
  ],
  order_manager: ["dashboard.read", "orders.read", "orders.write", "payments.read", "quotes.read"],
  product_manager: ["dashboard.read", "products.read", "products.write", "categories.write"],
  customer_support: ["dashboard.read", "customers.read", "quotes.read", "quotes.write", "orders.read"],
  customer: [],
};

export function isStaffRole(role) {
  return STAFF_ROLES.includes(role);
}

export function isAdminRole(role) {
  return ADMIN_ROLES.includes(role);
}

export function hasPermission(role, permission) {
  if (!role) return false;
  const list = ROLE_PERMISSIONS[role] || [];
  return list.includes("*") || list.includes(permission);
}
