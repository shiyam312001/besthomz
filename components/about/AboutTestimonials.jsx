import { Star } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomerAvatar } from "@/components/ui/CustomerAvatar";
import { HOME_TESTIMONIALS } from "@/components/home/home-testimonials-data";

const REVIEWS = HOME_TESTIMONIALS.slice(0, 3);

export function AboutTestimonials() {
  return (
    <section className="bg-bh-warm-white py-12 md:py-16">
      <PageContainer>
        <h2 className="mb-8 font-display text-2xl font-semibold text-bh-charcoal md:mb-10 md:text-3xl">What Our Customers Say</h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {REVIEWS.map((review) => (
            <article key={review.name} className="bh-glass-panel flex h-full flex-col rounded-2xl p-6 md:rounded-3xl">
              <div className="flex gap-0.5 text-amber-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm italic leading-relaxed text-bh-text">&ldquo;{review.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <CustomerAvatar name={review.name} src={review.avatar} accent={review.accent} size="md" />
                <div>
                  <p className="text-sm font-semibold text-bh-charcoal">{review.name}</p>
                  <p className="text-xs text-bh-muted">{review.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
