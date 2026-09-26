"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminSaveFaq } from "@/app/actions/admin/catalog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/providers/ToastProvider";

export function FaqForm({ faq }) {
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
          const res = await adminSaveFaq(fd);
          if (!res.ok) setError(res.error);
          else {
            toast("FAQ saved");
            router.push("/admin/faqs");
            router.refresh();
          }
        });
      }}
    >
      {faq?.id && <input type="hidden" name="id" value={faq.id} />}
      <FormField label="Question" htmlFor="question" required><Input id="question" name="question" required defaultValue={faq?.question || ""} /></FormField>
      <FormField label="Answer" htmlFor="answer" required><Textarea id="answer" name="answer" rows={4} required defaultValue={faq?.answer || ""} /></FormField>
      <FormField label="Category" htmlFor="category"><Input id="category" name="category" defaultValue={faq?.category || ""} /></FormField>
      <FormField label="Sort order" htmlFor="sort_order"><Input id="sort_order" name="sort_order" type="number" defaultValue={faq?.sort_order ?? 0} /></FormField>
      <Checkbox id="is_active" name="is_active" label="Active" defaultChecked={faq?.is_active ?? true} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <Button type="submit" loading={pending}>Save</Button>
    </form>
  );
}
