import { cn } from "@/lib/cn";

function Bone({ className }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-bh-beige/80", className)}
      aria-hidden
    />
  );
}

export function CardSkeleton({ className }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-bh-border bg-white p-3", className)}>
      <Bone className="aspect-[4/3] w-full rounded-xl" />
      <Bone className="mt-3 h-4 w-3/4" />
      <Bone className="mt-2 h-3 w-1/2" />
      <Bone className="mt-4 h-9 w-full rounded-full" />
    </div>
  );
}

export function ProductSkeleton() {
  return <CardSkeleton />;
}

export function PageSkeleton() {
  return (
    <div className="space-y-8 py-8" aria-busy="true" aria-label="Loading page">
      <Bone className="h-8 w-48" />
      <Bone className="h-64 w-full rounded-2xl" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function LoadingSkeleton({ className }) {
  return <Bone className={className} />;
}
