import Link from "next/link";
import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminCollectionsPage() {
  const rows = await staffSelect("collections", "id, name, slug, is_featured, sort_order, is_active");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Collections</h1>
      <AdminTable rows={rows} emptyMessage="No collections." columns={[
        { key: "name", label: "Name" },
        { key: "is_featured", label: "Featured", render: (r) => (r.is_featured ? "Yes" : "—") },
        { key: "is_active", label: "Active", render: (r) => (r.is_active ? "Yes" : "No") },
        { key: "id", label: "", render: (r) => <Link href={`/admin/collections/${r.id}/edit`} className="text-bh-green underline">Edit</Link> },
      ]} />
    </div>
  );
}
