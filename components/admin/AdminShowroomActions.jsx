"use client";

import { useTransition } from "react";
import { adminUpdateShowroomStatus } from "@/app/actions/admin/showroom";

export function AdminShowroomActions({ id, status }) {
  const [pending, startTransition] = useTransition();
  const btn = (next, label) => (
    <button
      type="button"
      disabled={pending}
      className="mr-2 text-xs text-bh-green underline"
      onClick={() => startTransition(() => adminUpdateShowroomStatus(id, next))}
    >
      {label}
    </button>
  );
  return (
    <div>
      {status === "requested" && btn("confirmed", "Confirm")}
      {status === "confirmed" && btn("completed", "Complete")}
      {status !== "cancelled" && btn("cancelled", "Cancel")}
    </div>
  );
}
