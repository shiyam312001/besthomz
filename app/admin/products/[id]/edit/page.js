import { notFound } from "next/navigation";
import { getStaffSupabase } from "@/lib/auth/staff";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductImagesManager } from "@/components/admin/ProductImagesManager";
import { AdminProductToolbar } from "@/components/admin/AdminProductToolbar";
import { ProductPricingForm } from "@/components/admin/ProductPricingForm";

export default async function AdminEditProductPage({ params }) {
  const { id } = await params;
  const { supabase } = await getStaffSupabase();
  if (!supabase) notFound();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (!product) notFound();
  const [{ data: categories }, { data: subcategories }, { data: images }, { data: pricing }] = await Promise.all([
    supabase.from("categories").select("id, name").order("name"),
    supabase.from("subcategories").select("id, name, category_id").order("name"),
    supabase.from("product_images").select("*").eq("product_id", id).order("sort_order"),
    supabase.from("product_pricing").select("*").eq("product_id", id).is("variant_id", null).maybeSingle(),
  ]);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Edit product</h1>
        <AdminProductToolbar productId={product.id} status={product.status} />
      </div>
      <ProductForm product={product} categories={categories ?? []} subcategories={subcategories ?? []} />
      <ProductImagesManager productId={product.id} images={images ?? []} />
      <ProductPricingForm productId={product.id} pricing={pricing} />
    </div>
  );
}
