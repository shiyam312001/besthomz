import { getStaffSupabase } from "@/lib/auth/staff";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function AdminNewProductPage() {
  const { supabase } = await getStaffSupabase();
  const { data: categories } = supabase
    ? await supabase.from("categories").select("id, name").order("name")
    : { data: [] };
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Add product</h1>
      <ProductForm categories={categories ?? []} />
    </div>
  );
}
