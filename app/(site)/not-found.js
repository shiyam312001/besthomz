import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageContainer className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="font-display text-4xl font-semibold text-bh-charcoal">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-bh-muted">
        We couldn&apos;t find what you were looking for. Browse our furniture collections or request a quote.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Home</Button>
        <Button href="/furniture" variant="outline">Furniture</Button>
      </div>
    </PageContainer>
  );
}
