"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { adminDeleteFaq } from "@/app/actions/admin/catalog";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function AdminFaqActions({ id }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex gap-2 text-xs">
      <Link href={`/admin/faqs/${id}/edit`} className="text-bh-green underline">Edit</Link>
      <button type="button" className="text-red-600 underline" onClick={() => setOpen(true)}>Delete</button>
      <ConfirmDialog
        open={open}
        title="Delete FAQ?"
        description="This permanently removes the FAQ entry."
        destructive
        confirmLabel="Delete"
        loading={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() =>
          startTransition(async () => {
            await adminDeleteFaq(id);
            setOpen(false);
          })
        }
      />
    </div>
  );
}
