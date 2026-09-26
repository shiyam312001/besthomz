"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminSaveProduct } from "@/app/actions/admin/products";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/providers/ToastProvider";

export function ProductForm({ product, categories, subcategories = [] }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const subs = subcategories.filter(
    (s) => !product?.category_id || s.category_id === product.category_id,
  );

  return (
    <form
      className="max-w-2xl space-y-4 rounded-2xl border border-bh-border bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await adminSaveProduct(fd);
          if (!res.ok) setError(res.error);
          else {
            toast("Product saved");
            if (!product?.id && res.id) router.push(`/admin/products/${res.id}/edit`);
            else router.refresh();
          }
        });
      }}
    >
      {product?.id && <input type="hidden" name="id" value={product.id} />}
      <FormField label="Name" htmlFor="name" required><Input id="name" name="name" required defaultValue={product?.name || ""} /></FormField>
      <FormField label="Slug" htmlFor="slug" required><Input id="slug" name="slug" required defaultValue={product?.slug || ""} /></FormField>
      <FormField label="Short description" htmlFor="short_description"><Input id="short_description" name="short_description" defaultValue={product?.short_description || ""} /></FormField>
      <FormField label="Description" htmlFor="description"><Textarea id="description" name="description" rows={4} defaultValue={product?.description || ""} /></FormField>
      <FormField label="Category" htmlFor="category_id">
        <Select id="category_id" name="category_id" defaultValue={product?.category_id || ""}>
          <option value="">—</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
      </FormField>
      <FormField label="Subcategory" htmlFor="subcategory_id">
        <Select id="subcategory_id" name="subcategory_id" defaultValue={product?.subcategory_id || ""}>
          <option value="">—</option>
          {subs.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
      </FormField>
      <FormField label="Status" htmlFor="status">
        <Select id="status" name="status" defaultValue={product?.status || "draft"}>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="archived">Archived</option>
        </Select>
      </FormField>
      <div className="flex flex-wrap gap-4">
        <Checkbox id="is_featured" name="is_featured" label="Featured" defaultChecked={product?.is_featured} />
        <Checkbox id="is_new" name="is_new" label="New" defaultChecked={product?.is_new} />
        <Checkbox id="is_bestseller" name="is_bestseller" label="Bestseller" defaultChecked={product?.is_bestseller} />
        <Checkbox id="is_customizable" name="is_customizable" label="Customizable" defaultChecked={product?.is_customizable} />
        <Checkbox id="is_quote_enabled" name="is_quote_enabled" label="Quote enabled" defaultChecked={product?.is_quote_enabled ?? true} />
      </div>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <Button type="submit" loading={pending}>Save product</Button>
    </form>
  );
}
