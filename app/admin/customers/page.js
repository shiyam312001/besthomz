import { getStaffSupabase } from "@/lib/auth/staff";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminCustomersPage() {
  const { supabase } = await getStaffSupabase();
  if (!supabase) {
    return <p className="text-sm text-bh-muted">Unable to load customers.</p>;
  }
  const { data: rows } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, created_at, role")
    .eq("role", "customer")
    .order("created_at", { ascending: false })
    .limit(200);

  const customers = rows ?? [];
  const ids = customers.map((c) => c.id);
  let quoteCounts = {};
  if (ids.length) {
    const { data: quotes } = await supabase.from("quote_requests").select("user_id").in("user_id", ids);
    for (const q of quotes || []) {
      if (q.user_id) quoteCounts[q.user_id] = (quoteCounts[q.user_id] || 0) + 1;
    }
  }

  const tableRows = customers.map((c) => ({ ...c, quote_count: quoteCounts[c.id] || 0 }));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Customers</h1>
      <AdminTable rows={tableRows} emptyMessage="No customers." columns={[
        { key: "full_name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "quote_count", label: "Quotes" },
        { key: "created_at", label: "Joined", render: (r) => new Date(r.created_at).toLocaleDateString() },
      ]} />
    </div>
  );
}
