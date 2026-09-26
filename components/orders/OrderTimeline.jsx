import { ORDER_TIMELINE } from "@/lib/orders/order-status";
import { cn } from "@/lib/cn";

const RANK = Object.fromEntries(ORDER_TIMELINE.map((s, i) => [s.key, i]));

export function OrderTimeline({ status }) {
  const currentRank = RANK[status] ?? 0;
  const visible = ORDER_TIMELINE.filter((step) => {
    if (status === "cancelled" || status === "refunded") return step.key === "pending";
    return RANK[step.key] <= Math.max(currentRank, RANK.confirmed);
  });

  return (
    <ol className="space-y-3 border-l border-bh-border pl-4">
      {ORDER_TIMELINE.map((step) => {
        const rank = RANK[step.key];
        const done = rank <= currentRank && status !== "cancelled" && status !== "refunded";
        const active = step.key === status;
        if (status === "cancelled" && step.key !== "pending") return null;
        return (
          <li key={step.key} className={cn("text-sm", !done && !active && "text-bh-muted")}>
            <span className={cn("font-medium", active && "text-bh-green")}>{step.label}</span>
            {done && !active && <span className="text-bh-muted"> · complete</span>}
          </li>
        );
      })}
      {(status === "cancelled" || status === "refunded") && (
        <li className="text-sm font-medium text-red-600">Order {status}</li>
      )}
    </ol>
  );
}
