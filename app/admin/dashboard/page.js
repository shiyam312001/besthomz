import Link from "next/link";
import { fetchDashboardStats } from "@/lib/admin/dashboard";
import { AdminTable } from "@/components/admin/AdminTable";

function StatCard({ label, value, href }) {
  const inner = (
    <div className="rounded-2xl border border-bh-border bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-bh-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-bh-charcoal">{value}</p>
    </div>
  );
  return href ? <Link href={href} className="block transition hover:opacity-90">{inner}</Link> : inner;
}

export default async function AdminDashboardPage() {
  const stats = await fetchDashboardStats();
  const c = stats?.counts ?? {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-bh-muted">Live counts from Supabase — no sample data.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Products" value={c.products} href="/admin/products" />
        <StatCard label="Active products" value={c.activeProducts} href="/admin/products" />
        <StatCard label="New quote requests" value={c.newQuotes} href="/admin/quotes" />
        <StatCard label="Open quotes" value={c.openQuotes} href="/admin/quotes" />
        <StatCard label="Showroom requests" value={c.showroom} href="/admin/showroom-visits" />
        <StatCard label="Customizations" value={c.customizations} href="/admin/customizations" />
        <StatCard label="Customers" value={c.customers} href="/admin/customers" />
        <StatCard label="New contact messages" value={c.contactNew} href="/admin/contact-messages" />
      </div>
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">Recent quote requests</h2>
        <AdminTable
          emptyMessage="No quote requests yet."
          columns={[
            { key: "quote_number", label: "Quote #" },
            { key: "full_name", label: "Customer" },
            { key: "status", label: "Status" },
            {
              key: "id",
              label: "",
              render: (row) => (
                <Link href={`/admin/quotes/${row.id}`} className="text-bh-green underline">View</Link>
              ),
            },
          ]}
          rows={stats?.recentQuotes ?? []}
        />
      </section>
    </div>
  );
}
