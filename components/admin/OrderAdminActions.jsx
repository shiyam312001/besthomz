"use client";

import { useTransition, useState } from "react";
import { adminUpdateOrderStatus } from "@/app/actions/admin/orders";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { canTransitionOrderStatus } from "@/lib/orders/order-status";

const ACTIONS = [
  { status: "confirmed", label: "Confirm" },
  { status: "processing", label: "Processing" },
  { status: "ready", label: "Ready" },
  { status: "shipped", label: "Shipped" },
  { status: "delivered", label: "Delivered" },
  { status: "cancelled", label: "Cancel", destructive: true },
];

export function OrderAdminActions({ order }) {
  const [pending, startTransition] = useTransition();
  const [confirmCancel, setConfirmCancel] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.map((a) => {
        if (!canTransitionOrderStatus(order.status, a.status)) return null;
        if (a.destructive) {
          return (
            <Button key={a.status} size="sm" variant="outline" onClick={() => setConfirmCancel(true)}>
              {a.label}
            </Button>
          );
        }
        return (
          <Button
            key={a.status}
            size="sm"
            variant={order.status === a.status ? "primary" : "outline"}
            loading={pending}
            onClick={() =>
              startTransition(async () => {
                await adminUpdateOrderStatus(order.id, a.status);
              })
            }
          >
            {a.label}
          </Button>
        );
      })}
      <ConfirmDialog
        open={confirmCancel}
        title="Cancel order?"
        description="This will mark the order as cancelled. Refunds are not processed automatically."
        confirmLabel="Cancel order"
        destructive
        onConfirm={() =>
          startTransition(async () => {
            await adminUpdateOrderStatus(order.id, "cancelled");
            setConfirmCancel(false);
          })
        }
        onCancel={() => setConfirmCancel(false)}
      />
    </div>
  );
}
