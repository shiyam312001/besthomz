import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="h-10 w-56" />
      <LoadingSkeleton className="h-64 w-full" />
    </div>
  );
}
