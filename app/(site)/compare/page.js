import { PageContainer } from "@/components/layout/PageContainer";
import { CompareView } from "@/components/compare/CompareView";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Compare Furniture",
  path: "/compare",
  noIndex: true,
});

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
