import Link from "next/link";
import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminCategoriesPage() {
  const rows = await staffSelect("categories", "id, name, slug, is_active, sort_order, updated_at");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Categories</h1>
        <Link href="/admin/categories/new" className="rounded-full bg-bh-green px-4 py-2 text-sm text-white">Add category</Link>
      </div>
      <AdminTable
        rows={rows}
        emptyMessage="No categories."
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "is_active", label: "Active", render: (r) => (r.is_active ? "Yes" : "No") },
          { key: "sort_order", label: "Sort" },
          { key: "id", label: "", render: (r) => <Link href={`/admin/categories/${r.id}/edit`} className="text-bh-green underline">Edit</Link> },
        ]}
      />
    </div>
  );
}
