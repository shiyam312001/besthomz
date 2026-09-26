import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function OrdersLoading() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="h-8 w-40" />
      <LoadingSkeleton className="h-24 w-full" />
      <LoadingSkeleton className="h-24 w-full" />
    </div>
  );
}
