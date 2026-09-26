import { getStaffSupabase } from "@/lib/auth/staff";
import { SubcategoryForm } from "@/components/admin/SubcategoryForm";

export default async function AdminNewSubcategoryPage() {
  const { supabase } = await getStaffSupabase();
  const { data: categories } = supabase ? await supabase.from("categories").select("id, name").order("name") : { data: [] };
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">New subcategory</h1>
      <SubcategoryForm categories={categories ?? []} />
    </div>
  );
}
