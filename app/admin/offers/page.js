import Link from "next/link";
import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";
import { offerScheduleLabel } from "@/lib/admin/offer-schedule";

export default async function AdminOffersPage() {
  const rows = await staffSelect("offers", "id, title, slug, is_active, starts_at, ends_at");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Offers</h1>
        <Link href="/admin/offers/new" className="rounded-full bg-bh-green px-4 py-2 text-sm text-white">Add offer</Link>
      </div>
      <p className="text-sm text-bh-muted">Quote-first site — no discount amounts shown to customers.</p>
      <AdminTable rows={rows} emptyMessage="No offers." columns={[
        { key: "title", label: "Title" },
        { key: "schedule", label: "Schedule", render: (r) => offerScheduleLabel(r) },
        { key: "is_active", label: "Flag active", render: (r) => (r.is_active ? "Yes" : "No") },
        { key: "id", label: "", render: (r) => <Link href={`/admin/offers/${r.id}/edit`} className="text-bh-green underline">Edit</Link> },
      ]} />
    </div>
  );
}
