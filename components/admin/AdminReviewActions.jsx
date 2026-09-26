"use client";

import { useState, useTransition } from "react";
import { adminUpdateReviewStatus, adminDeleteReview } from "@/app/actions/admin/reviews";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function AdminReviewActions({ id, status }) {
  const [pending, startTransition] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {status !== "approved" && (
        <button type="button" disabled={pending} className="text-bh-green underline" onClick={() => startTransition(() => adminUpdateReviewStatus(id, "approved"))}>Approve</button>
      )}
      {status !== "rejected" && (
        <button type="button" disabled={pending} className="text-amber-700 underline" onClick={() => startTransition(() => adminUpdateReviewStatus(id, "rejected"))}>Reject</button>
      )}
      <button type="button" className="text-red-600 underline" onClick={() => setDeleteOpen(true)}>Delete</button>
      <ConfirmDialog
        open={deleteOpen}
        title="Delete review?"
        description="This permanently removes the review."
        destructive
        confirmLabel="Delete"
        loading={pending}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() =>
          startTransition(async () => {
            await adminDeleteReview(id);
            setDeleteOpen(false);
          })
        }
      />
    </div>
  );
}
