import { PageContainer } from "@/components/layout/PageContainer";
import { HOW_CUSTOMIZE } from "@/components/customize/customize-data";

export function CustomizeHowWorks() {
  return (
    <section className="bg-bh-sage-muted/35 py-12 md:py-16">
      <PageContainer>
        <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">How Customization Works</h2>
        <p className="mt-2 text-sm text-bh-muted">From product choice to delivery — a simple five-step journey.</p>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {HOW_CUSTOMIZE.map((item) => (
            <li key={item.num} className="bh-glass-panel rounded-2xl p-5 md:rounded-3xl md:p-6">
              <span className="font-display text-2xl font-semibold text-bh-green/80">{item.num}</span>
              <h3 className="mt-2 text-sm font-semibold text-bh-charcoal md:text-base">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-bh-muted md:text-sm">{item.text}</p>
            </li>
          ))}
        </ol>
      </PageContainer>
    </section>
  );
}
