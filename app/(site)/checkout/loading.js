import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function CheckoutLoading() {
  return (
    <PageContainer className="bh-section">
      <LoadingSkeleton className="mb-6 h-10 w-48" />
      <LoadingSkeleton className="h-96 w-full" />
    </PageContainer>
  );
}
