import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminReviewActions } from "@/components/admin/AdminReviewActions";

export default async function AdminReviewsPage() {
  const rows = await staffSelect("reviews", "id, rating, title, status, products(name), profiles(full_name)");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Reviews</h1>
      <AdminTable rows={rows} emptyMessage="No reviews." columns={[
        { key: "products", label: "Product", render: (r) => r.products?.name },
        { key: "profiles", label: "Customer", render: (r) => r.profiles?.full_name },
        { key: "rating", label: "Rating" },
        { key: "status", label: "Status" },
        { key: "id", label: "", render: (r) => <AdminReviewActions id={r.id} status={r.status} /> },
      ]} />
    </div>
  );
}
