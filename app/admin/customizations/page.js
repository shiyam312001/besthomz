import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminCustomizationsPage() {
  const rows = await staffSelect("customizations", "id, status, created_at, profiles(full_name), products(name)");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Customizations</h1>
      <AdminTable rows={rows} emptyMessage="No customization requests." columns={[
        { key: "profiles", label: "Customer", render: (r) => r.profiles?.full_name || "—" },
        { key: "products", label: "Product", render: (r) => r.products?.name || "—" },
        { key: "status", label: "Status" },
        { key: "created_at", label: "Date", render: (r) => new Date(r.created_at).toLocaleDateString() },
      ]} />
    </div>
  );
}
