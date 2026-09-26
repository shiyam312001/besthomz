import { notFound } from "next/navigation";
import { getStaffSupabase } from "@/lib/auth/staff";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function AdminEditCategoryPage({ params }) {
  const { id } = await params;
  const { supabase } = await getStaffSupabase();
  if (!supabase) notFound();
  const { data: category } = await supabase.from("categories").select("*").eq("id", id).maybeSingle();
  if (!category) notFound();
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Edit category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
