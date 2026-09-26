"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/providers/ToastProvider";

export function ProfileForm({ profile, email }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <form
      className="mt-6 max-w-lg space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await updateProfile(fd);
          if (!res.ok) setError(res.error);
          else toast("Profile updated");
        });
      }}
    >
      <FormField label="Email">
        <Input value={email || ""} disabled readOnly />
      </FormField>
      <FormField label="Full name" htmlFor="full_name">
        <Input id="full_name" name="full_name" defaultValue={profile?.full_name || ""} />
      </FormField>
      <FormField label="Phone" htmlFor="phone">
        <Input id="phone" name="phone" type="tel" defaultValue={profile?.phone || ""} />
      </FormField>
      <FormField label="Avatar URL" htmlFor="avatar_url">
        <Input id="avatar_url" name="avatar_url" defaultValue={profile?.avatar_url || ""} />
      </FormField>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" loading={pending}>Save changes</Button>
    </form>
  );
}
