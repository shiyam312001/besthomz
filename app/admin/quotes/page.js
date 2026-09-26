import Link from "next/link";
import { getStaffSupabase } from "@/lib/auth/staff";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminQuotesPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status;
  const q = params?.q?.trim();
  const { supabase } = await getStaffSupabase();
  let query = supabase
    ?.from("quote_requests")
    .select("id, quote_number, full_name, phone, status, created_at, updated_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (status) query = query.eq("status", status);
  if (q) query = query.or(`quote_number.ilike.%${q}%,full_name.ilike.%${q}%,phone.ilike.%${q}%`);

  const { data: rows } = await query;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Quote requests</h1>
      <form className="flex flex-wrap gap-2">
        <input name="q" placeholder="Search…" className="rounded-full border border-bh-border px-4 py-2 text-sm" defaultValue={q || ""} />
        <select name="status" className="rounded-full border border-bh-border px-4 py-2 text-sm" defaultValue={status || ""}>
          <option value="">All statuses</option>
          {["new", "contacted", "requirement_confirmed", "quote_prepared", "awaiting_customer", "approved", "rejected", "closed"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="submit" className="rounded-full bg-bh-green px-4 py-2 text-sm text-white">Filter</button>
      </form>
      <AdminTable
        rows={rows ?? []}
        emptyMessage="No quote requests yet."
        columns={[
          { key: "quote_number", label: "Quote #" },
          { key: "full_name", label: "Customer" },
          { key: "status", label: "Status" },
          { key: "created_at", label: "Created", render: (r) => new Date(r.created_at).toLocaleDateString() },
          { key: "id", label: "", render: (r) => <Link href={`/admin/quotes/${r.id}`} className="text-bh-green underline">View</Link> },
        ]}
      />
    </div>
  );
}
