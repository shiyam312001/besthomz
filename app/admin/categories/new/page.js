import { CategoryForm } from "@/components/admin/CategoryForm";

export default function AdminNewCategoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">New category</h1>
      <CategoryForm />
    </div>
  );
}
