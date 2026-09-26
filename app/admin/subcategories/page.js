import Link from "next/link";
import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminSubcategoriesPage() {
  const rows = await staffSelect("subcategories", "id, name, slug, is_active, sort_order, categories(name)");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Subcategories</h1>
        <Link href="/admin/subcategories/new" className="rounded-full bg-bh-green px-4 py-2 text-sm text-white">Add subcategory</Link>
      </div>
      <AdminTable
        rows={rows}
        emptyMessage="No subcategories."
        columns={[
          { key: "name", label: "Name" },
          { key: "categories", label: "Category", render: (r) => r.categories?.name },
          { key: "is_active", label: "Active", render: (r) => (r.is_active ? "Yes" : "No") },
          { key: "id", label: "", render: (r) => <Link href={`/admin/subcategories/${r.id}/edit`} className="text-bh-green underline">Edit</Link> },
        ]}
      />
    </div>
  );
}
