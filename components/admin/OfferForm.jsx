"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminSaveOffer } from "@/app/actions/admin/catalog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/providers/ToastProvider";

export function OfferForm({ offer }) {
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
          const res = await adminSaveOffer(fd);
          if (!res.ok) setError(res.error);
          else {
            toast("Offer saved");
            router.push("/admin/offers");
            router.refresh();
          }
        });
      }}
    >
      {offer?.id && <input type="hidden" name="id" value={offer.id} />}
      <FormField label="Title" htmlFor="title" required><Input id="title" name="title" required defaultValue={offer?.title || ""} /></FormField>
      <FormField label="Slug" htmlFor="slug" required><Input id="slug" name="slug" required defaultValue={offer?.slug || ""} /></FormField>
      <FormField label="Description" htmlFor="description"><Textarea id="description" name="description" rows={3} defaultValue={offer?.description || ""} /></FormField>
      <FormField label="Image URL" htmlFor="image_url"><Input id="image_url" name="image_url" defaultValue={offer?.image_url || ""} /></FormField>
      <FormField label="CTA label" htmlFor="cta_label"><Input id="cta_label" name="cta_label" defaultValue={offer?.cta_label || ""} /></FormField>
      <FormField label="CTA URL" htmlFor="cta_url"><Input id="cta_url" name="cta_url" defaultValue={offer?.cta_url || ""} /></FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Starts at" htmlFor="starts_at"><Input id="starts_at" name="starts_at" type="datetime-local" defaultValue={offer?.starts_at?.slice(0, 16) || ""} /></FormField>
        <FormField label="Ends at" htmlFor="ends_at"><Input id="ends_at" name="ends_at" type="datetime-local" defaultValue={offer?.ends_at?.slice(0, 16) || ""} /></FormField>
      </div>
      <Checkbox id="is_active" name="is_active" label="Active" defaultChecked={offer?.is_active ?? true} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <Button type="submit" loading={pending}>Save</Button>
    </form>
  );
}
