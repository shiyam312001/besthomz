"use client";

import { useState, useTransition } from "react";
import { submitShowroomVisit } from "@/app/actions/showroom";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/providers/ToastProvider";

export function ShowroomVisitForm({ defaults = {} }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <form
      className="mt-6 max-w-lg space-y-4 rounded-2xl border border-bh-border bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await submitShowroomVisit(fd);
          if (!res.ok) setError(res.error);
          else {
            toast("Showroom visit request submitted");
            e.target.reset();
          }
        });
      }}
    >
      <FormField label="Full name" htmlFor="full_name" required><Input id="full_name" name="full_name" required defaultValue={defaults.full_name || ""} /></FormField>
      <FormField label="Phone" htmlFor="phone" required><Input id="phone" name="phone" type="tel" required defaultValue={defaults.phone || ""} /></FormField>
      <FormField label="Email" htmlFor="email"><Input id="email" name="email" type="email" defaultValue={defaults.email || ""} /></FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Preferred date" htmlFor="preferred_date"><Input id="preferred_date" name="preferred_date" type="date" /></FormField>
        <FormField label="Preferred time" htmlFor="preferred_time"><Input id="preferred_time" name="preferred_time" placeholder="e.g. 11:00 AM" /></FormField>
      </div>
      <FormField label="Visitors" htmlFor="visitors_count"><Input id="visitors_count" name="visitors_count" type="number" min="1" /></FormField>
      <FormField label="Requirement" htmlFor="requirement"><Textarea id="requirement" name="requirement" rows={3} /></FormField>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" loading={pending}>Request visit</Button>
    </form>
  );
}
