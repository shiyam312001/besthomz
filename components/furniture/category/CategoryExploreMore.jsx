import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export function CategoryExploreMore({ categories, currentSlug }) {
  const items = categories.filter((c) => c.slug !== currentSlug).slice(0, 6);
  if (!items.length) return null;

  return (
    <section className="bg-bh-sage-muted/30 py-12 md:py-16">
      <PageContainer>
        <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Explore More Furniture</h2>
        <p className="mt-2 text-sm text-bh-muted">Browse other categories from our showroom collection.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {items.map((cat) => (
            <Link
              key={cat.slug}
              href={`/furniture/${cat.slug}`}
              className="group flex flex-col items-center rounded-2xl p-3 bh-glass-card bh-shadow-soft transition hover:-translate-y-0.5 md:rounded-3xl md:p-4"
            >
              <div className="relative aspect-square w-full max-w-[7rem]">
                <Image
                  src={cat.image_url || "/BestHomz/Homepage/categories/07-category-sofa.png"}
                  alt=""
                  fill
                  className="object-contain p-2 transition duration-300 group-hover:scale-[1.03]"
                  sizes="120px"
                />
              </div>
              <span className="mt-3 text-center text-xs font-semibold text-bh-charcoal md:text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
