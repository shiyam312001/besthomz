import { PageContainer } from "@/components/layout/PageContainer";
import { CategoryCard } from "@/components/product/CategoryCard";
import { fetchActiveCategories } from "@/lib/catalog/categories";
import { fetchFeaturedProducts } from "@/lib/catalog/products";
import { fetchActiveRooms } from "@/lib/catalog/rooms";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeTrustVision } from "@/components/home/HomeTrustVision";
import { HomeRoomGrid } from "@/components/home/HomeRoomGrid";
import { HomeFeaturedTabs } from "@/components/home/HomeFeaturedTabs";
import { HomeCustomizeExpert } from "@/components/home/HomeCustomizeExpert";
import { HomeWhyChoose } from "@/components/home/HomeWhyChoose";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeInspiration } from "@/components/home/HomeInspiration";
import { HomeQuoteStrip } from "@/components/home/HomeQuoteStrip";
import { HomeShowroom } from "@/components/home/HomeShowroom";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeStripDivider } from "@/components/home/HomeStripDivider";
import { Fragment } from "react";
export async function HomeView() {
  const [categories, featured, rooms] = await Promise.all([
    fetchActiveCategories(),
    fetchFeaturedProducts(12),
    fetchActiveRooms(),
  ]);

  const stripCategories = categories.slice(0, 8);

  return (
    <div className="bg-bh-warm-white">
      <HomeHero />

      <section className="relative z-10 bg-bh-warm-white pb-6 md:pb-8">
        <PageContainer className="-mt-6 md:-mt-10">
          <HomeReveal>
            <div className="bh-glass-panel rounded-2xl px-3 py-5 md:rounded-3xl md:px-4 md:py-6">
              <div className="bh-scroll-x items-center gap-2 pb-1 md:flex md:justify-between md:gap-0 md:overflow-visible md:pb-0">
                {stripCategories.map((cat, index) => (
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
          </HomeReveal>
        </PageContainer>
      </section>

      <HomeReveal delay={80}>
        <HomeTrustVision />
      </HomeReveal>
      <HomeReveal delay={100}>
        <HomeRoomGrid rooms={rooms} />
      </HomeReveal>

      <HomeReveal delay={120}>
        <section className="bh-section bg-white">
          <PageContainer>
            <HomeFeaturedTabs products={featured} />
          </PageContainer>
        </section>
      </HomeReveal>

      <HomeReveal delay={80}>
        <HomeCustomizeExpert />
      </HomeReveal>
      <HomeReveal delay={100}>
        <HomeWhyChoose />
      </HomeReveal>
      <HomeReveal delay={80}>
        <HomeTestimonials />
      </HomeReveal>
      <HomeReveal delay={100}>
        <HomeHowItWorks />
      </HomeReveal>
      <HomeReveal delay={80}>
        <HomeInspiration />
      </HomeReveal>
      <HomeReveal delay={100}>
        <HomeQuoteStrip />
      </HomeReveal>
      <HomeReveal delay={80}>
        <HomeShowroom />
      </HomeReveal>
    </div>
  );
}
