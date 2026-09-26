import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function AdminOrdersLoading() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="h-8 w-32" />
      <LoadingSkeleton className="h-64 w-full" />
    </div>
  );
}
