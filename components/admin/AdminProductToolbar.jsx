"use client";

import { useState, useTransition } from "react";
import { adminArchiveProduct, adminRestoreProduct } from "@/app/actions/admin/products";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/Button";

export function AdminProductToolbar({ productId, status }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {status === "archived" ? (
        <Button
          size="sm"
          variant="outline"
          loading={pending}
          onClick={() => startTransition(() => adminRestoreProduct(productId, "active"))}
        >
          Restore to active
        </Button>
      ) : (
        <>
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>Archive</Button>
          {status !== "draft" && (
            <Button
              size="sm"
              variant="ghost"
              loading={pending}
              onClick={() => startTransition(() => adminRestoreProduct(productId, "draft"))}
            >
              Mark draft
            </Button>
          )}
        </>
      )}
      <ConfirmDialog
        open={open}
        title="Archive product?"
        description="Archived products are hidden from the public catalog. Historical quotes remain intact."
        destructive
        confirmLabel="Archive"
        loading={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() =>
          startTransition(async () => {
            await adminArchiveProduct(productId);
            setOpen(false);
          })
        }
      />
    </div>
  );
}
