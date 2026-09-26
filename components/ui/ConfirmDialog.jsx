"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

export function ConfirmDialog({
  open,
  title = "Confirm",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <button type="button" className="absolute inset-0 bg-bh-charcoal/45" aria-label="Close" onClick={onCancel} />
      <div className="relative w-full max-w-md rounded-2xl border border-bh-border bg-white p-6 shadow-xl">
        <h2 id="confirm-title" className="font-display text-lg font-semibold text-bh-charcoal">{title}</h2>
        {description && <p className="mt-2 text-sm text-bh-muted">{description}</p>}
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>{cancelLabel}</Button>
          <button
            ref={confirmRef}
            type="button"
            disabled={loading}
            className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-white bh-focus-ring disabled:opacity-60 ${destructive ? "bg-red-700 hover:bg-red-800" : "bg-bh-green hover:bg-bh-green-light"}`}
            onClick={onConfirm}
          >
            {loading ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
