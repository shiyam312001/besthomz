"use client";

import { useState, useTransition } from "react";
import { adminSaveCollection } from "@/app/actions/admin/catalog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/providers/ToastProvider";

export function CollectionEditForm({ collection }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <form
      className="max-w-xl space-y-4 rounded-2xl border border-bh-border bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await adminSaveCollection(fd);
          if (!res.ok) setError(res.error);
          else toast("Collection saved");
        });
      }}
    >
      <input type="hidden" name="id" value={collection.id} />
      <FormField label="Name" htmlFor="name" required><Input id="name" name="name" required defaultValue={collection.name} /></FormField>
      <FormField label="Slug" htmlFor="slug" required><Input id="slug" name="slug" required defaultValue={collection.slug} /></FormField>
      <FormField label="Description" htmlFor="description"><Textarea id="description" name="description" rows={3} defaultValue={collection.description || ""} /></FormField>
      <FormField label="Hero image URL" htmlFor="hero_image"><Input id="hero_image" name="hero_image" defaultValue={collection.hero_image || ""} /></FormField>
      <FormField label="Sort order" htmlFor="sort_order"><Input id="sort_order" name="sort_order" type="number" defaultValue={collection.sort_order ?? 0} /></FormField>
      <Checkbox id="is_featured" name="is_featured" label="Featured" defaultChecked={collection.is_featured} />
      <Checkbox id="is_active" name="is_active" label="Active" defaultChecked={collection.is_active} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" loading={pending}>Save</Button>
    </form>
  );
}
