"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminSaveRoom } from "@/app/actions/admin/catalog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/providers/ToastProvider";

export function RoomForm({ room }) {
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
          const res = await adminSaveRoom(fd);
          if (!res.ok) setError(res.error);
          else {
            toast("Room saved");
            router.push("/admin/rooms");
            router.refresh();
          }
        });
      }}
    >
      {room?.id && <input type="hidden" name="id" value={room.id} />}
      <FormField label="Name" htmlFor="name" required><Input id="name" name="name" required defaultValue={room?.name || ""} /></FormField>
      <FormField label="Slug" htmlFor="slug" required><Input id="slug" name="slug" required defaultValue={room?.slug || ""} /></FormField>
      <FormField label="Description" htmlFor="description"><Textarea id="description" name="description" rows={3} defaultValue={room?.description || ""} /></FormField>
      <FormField label="Hero image URL" htmlFor="hero_image"><Input id="hero_image" name="hero_image" defaultValue={room?.hero_image || ""} /></FormField>
      <FormField label="Sort order" htmlFor="sort_order"><Input id="sort_order" name="sort_order" type="number" defaultValue={room?.sort_order ?? 0} /></FormField>
      <Checkbox id="is_active" name="is_active" label="Active" defaultChecked={room?.is_active ?? true} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <Button type="submit" loading={pending}>Save</Button>
    </form>
  );
}
