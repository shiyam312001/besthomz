"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminSaveSubcategory } from "@/app/actions/admin/catalog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/providers/ToastProvider";

export function SubcategoryForm({ subcategory, categories }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-4 rounded-2xl border border-bh-border bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await adminSaveSubcategory(fd);
          if (!res.ok) setError(res.error);
          else {
            toast("Subcategory saved");
            router.push("/admin/subcategories");
            router.refresh();
          }
        });
      }}
    >
      {subcategory?.id && <input type="hidden" name="id" value={subcategory.id} />}
      <FormField label="Category" htmlFor="category_id" required>
        <Select id="category_id" name="category_id" required defaultValue={subcategory?.category_id || ""}>
          <option value="">Select category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
      </FormField>
      <FormField label="Name" htmlFor="name" required><Input id="name" name="name" required defaultValue={subcategory?.name || ""} /></FormField>
      <FormField label="Slug" htmlFor="slug" required><Input id="slug" name="slug" required defaultValue={subcategory?.slug || ""} /></FormField>
      <FormField label="Description" htmlFor="description"><Textarea id="description" name="description" rows={2} defaultValue={subcategory?.description || ""} /></FormField>
      <FormField label="Sort order" htmlFor="sort_order"><Input id="sort_order" name="sort_order" type="number" defaultValue={subcategory?.sort_order ?? 0} /></FormField>
      <Checkbox id="is_active" name="is_active" label="Active" defaultChecked={subcategory?.is_active ?? true} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <Button type="submit" loading={pending}>Save</Button>
    </form>
  );
}
