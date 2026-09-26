import { Fragment } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { CategoryCard } from "@/components/product/CategoryCard";
import { HomeStripDivider } from "@/components/home/HomeStripDivider";

export function FurnitureCategoryStrip({ categories = [] }) {
  const strip = categories.slice(0, 8);

  return (
    <section className="relative z-10 bg-bh-warm-white pb-4 md:pb-6">
      <PageContainer className="-mt-6 md:-mt-10">
        <div className="bh-glass-panel rounded-2xl px-3 py-5 md:rounded-3xl md:px-4 md:py-6">
          <div className="bh-scroll-x items-center gap-2 pb-1 md:flex md:justify-between md:gap-0 md:overflow-visible md:pb-0">
            {strip.map((cat, index) => (
              <Fragment key={cat.slug}>
                {index > 0 && <HomeStripDivider className="mx-0.5" />}
                <div className="flex shrink-0 justify-center px-2 md:flex-1 md:px-1">
                  <CategoryCard
                    name={cat.name}
                    image={cat.image_url}
                    href={`/furniture/${cat.slug}`}
                    size="home"
                  />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
