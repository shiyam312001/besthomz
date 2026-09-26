"use client";

import { useTransition } from "react";
import { adminUpdateContactStatus } from "@/app/actions/admin/contact";

export function AdminContactActions({ id, status }) {
  const [pending, startTransition] = useTransition();
  const link = (next, label) => (
    <button type="button" disabled={pending} className="mr-2 text-xs text-bh-green underline" onClick={() => startTransition(() => adminUpdateContactStatus(id, next))}>{label}</button>
  );
  return (
    <div>
      {status === "new" && link("read", "Mark read")}
      {status !== "replied" && link("replied", "Mark replied")}
      {status !== "closed" && link("closed", "Close")}
    </div>
  );
}
