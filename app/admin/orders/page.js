import Link from "next/link";
import { getStaffSupabase } from "@/lib/auth/staff";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatInrFromRupees } from "@/lib/commerce/money";

export default async function AdminOrdersPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status;
  const payment = params?.payment;
  const q = params?.q?.trim();
  const { supabase } = await getStaffSupabase();

  let query = supabase
    ?.from("orders")
    .select("id, order_number, status, payment_status, total, created_at, billing_address, user_id")
    .order("created_at", { ascending: false })
    .limit(100);

  if (status) query = query.eq("status", status);
  if (payment) query = query.eq("payment_status", payment);
  if (q) query = query.or(`order_number.ilike.%${q}%`);

  const { data: rows } = await query;

  const enriched = (rows || []).map((r) => ({
    ...r,
    customer: r.billing_address?.name || "—",
    email: r.billing_address?.email || "",
  }));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Orders</h1>
      <form className="flex flex-wrap gap-2">
        <input name="q" placeholder="Order #, name…" className="rounded-full border border-bh-border px-4 py-2 text-sm" defaultValue={q || ""} />
        <select name="status" className="rounded-full border border-bh-border px-4 py-2 text-sm" defaultValue={status || ""}>
          <option value="">All statuses</option>
          {["pending", "confirmed", "processing", "ready", "shipped", "delivered", "cancelled", "refunded"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select name="payment" className="rounded-full border border-bh-border px-4 py-2 text-sm" defaultValue={payment || ""}>
          <option value="">All payments</option>
          {["pending", "created", "paid", "failed", "cancelled", "refunded"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="submit" className="rounded-full bg-bh-green px-4 py-2 text-sm text-white">Filter</button>
      </form>
      <AdminTable
        rows={enriched}
        emptyMessage="No orders yet."
        columns={[
          { key: "order_number", label: "Order" },
          { key: "customer", label: "Customer" },
          { key: "created_at", label: "Date", render: (r) => new Date(r.created_at).toLocaleDateString() },
          { key: "status", label: "Status" },
          { key: "payment_status", label: "Payment" },
          { key: "total", label: "Total", render: (r) => (r.total != null ? formatInrFromRupees(r.total) : "—") },
          { key: "id", label: "", render: (r) => <Link href={`/admin/orders/${r.id}`} className="text-bh-green underline">View</Link> },
        ]}
      />
    </div>
  );
}
