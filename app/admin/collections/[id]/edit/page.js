import { notFound } from "next/navigation";
import { getStaffSupabase } from "@/lib/auth/staff";
import { CollectionEditForm } from "@/components/admin/CollectionEditForm";
import { CollectionProductsEditor } from "@/components/admin/CollectionProductsEditor";

export default async function AdminCollectionEditPage({ params }) {
  const { id } = await params;
  const { supabase } = await getStaffSupabase();
  if (!supabase) notFound();
  const { data: collection } = await supabase.from("collections").select("*").eq("id", id).maybeSingle();
  if (!collection) notFound();
  const { data: links } = await supabase
    .from("collection_products")
    .select("sort_order, products(id, name, slug, product_images(image_url, is_primary))")
    .eq("collection_id", id)
    .order("sort_order");
  const initialProducts = (links || []).map((row) => ({
    id: row.products.id,
    name: row.products.name,
    slug: row.products.slug,
    image: row.products.product_images?.find((i) => i.is_primary)?.image_url || row.products.product_images?.[0]?.image_url,
  }));

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-semibold">Edit collection</h1>
      <CollectionEditForm collection={collection} />
      <CollectionProductsEditor collectionId={id} initialProducts={initialProducts} />
    </div>
  );
}
