import { PageContainer } from "@/components/layout/PageContainer";
import { CompareView } from "@/components/compare/CompareView";

export const metadata = {
  title: "Compare products",
  robots: { index: false, follow: false },
};

export default function ComparePage() {
  return (
    <PageContainer className="bh-section">
      <h1 className="font-display text-3xl font-semibold">Compare</h1>
      <p className="mt-2 text-sm text-bh-muted">Up to 4 products · quote-first (no prices).</p>
      <div className="mt-8">
        <CompareView />
      </div>
    </PageContainer>
  );
}
