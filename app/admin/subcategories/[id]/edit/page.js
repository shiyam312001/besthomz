import { notFound } from "next/navigation";
import { getStaffSupabase } from "@/lib/auth/staff";
import { SubcategoryForm } from "@/components/admin/SubcategoryForm";

export default async function AdminEditSubcategoryPage({ params }) {
  const { id } = await params;
  const { supabase } = await getStaffSupabase();
  if (!supabase) notFound();
  const { data: subcategory } = await supabase.from("subcategories").select("*").eq("id", id).maybeSingle();
  if (!subcategory) notFound();
  const { data: categories } = await supabase.from("categories").select("id, name").order("name");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Edit subcategory</h1>
      <SubcategoryForm subcategory={subcategory} categories={categories ?? []} />
    </div>
  );
}
