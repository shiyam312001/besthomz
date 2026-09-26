import Link from "next/link";
import Image from "next/image";
import { getStaffSupabase } from "@/lib/auth/staff";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminProductsPage({ searchParams }) {
  const params = await searchParams;
  const categoryId = params?.category;
  const status = params?.status;
  const { supabase } = await getStaffSupabase();
  let query = supabase
    ?.from("products")
    .select("id, slug, name, status, is_featured, is_customizable, updated_at, categories(name), product_images(image_url, is_primary)")
    .order("updated_at", { ascending: false })
    .limit(200);
  if (categoryId) query = query.eq("category_id", categoryId);
  if (status) query = query.eq("status", status);
  const { data: rows } = await query;
  const { data: categories } = await supabase?.from("categories").select("id, name").order("name");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Products</h1>
        <Link href="/admin/products/new" className="rounded-full bg-bh-green px-4 py-2 text-sm text-white">Add product</Link>
      </div>
      <form className="flex flex-wrap gap-2">
        <select name="status" className="rounded-full border px-3 py-2 text-sm" defaultValue={status || ""}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="inactive">Inactive</option>
          <option value="archived">Archived</option>
        </select>
        <select name="category" className="rounded-full border px-3 py-2 text-sm" defaultValue={categoryId || ""}>
          <option value="">All categories</option>
          {(categories || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button type="submit" className="rounded-full bg-bh-charcoal px-4 py-2 text-sm text-white">Filter</button>
      </form>
      <AdminTable
        emptyMessage="No products yet."
        rows={rows ?? []}
        columns={[
          {
            key: "image",
            label: "",
            render: (r) => {
              const img = r.product_images?.find((i) => i.is_primary) || r.product_images?.[0];
              return img ? (
                <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-bh-cream">
                  <Image src={img.image_url} alt="" fill className="object-cover" sizes="40px" />
                </div>
              ) : "—";
            },
          },
          { key: "name", label: "Product" },
          { key: "categories", label: "Category", render: (r) => r.categories?.name || "—" },
          { key: "status", label: "Status" },
          { key: "is_featured", label: "Featured", render: (r) => (r.is_featured ? "Yes" : "—") },
          { key: "id", label: "", render: (r) => <Link href={`/admin/products/${r.id}/edit`} className="text-bh-green underline">Edit</Link> },
        ]}
      />
    </div>
  );
}
