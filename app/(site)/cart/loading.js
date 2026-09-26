import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function CartLoading() {
  return (
    <PageContainer className="bh-section">
      <LoadingSkeleton className="mb-4 h-10 w-48" />
      <LoadingSkeleton className="h-32 w-full" />
      <LoadingSkeleton className="mt-4 h-32 w-full" />
    </PageContainer>
  );
}
