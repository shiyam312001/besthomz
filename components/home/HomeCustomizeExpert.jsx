import Image from "next/image";
import { ArrowRight, Layers, Palette, Ruler, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";

const OPTIONS = [
  { label: "Size", icon: Ruler },
  { label: "Material", icon: Layers },
  { label: "Colour", icon: Palette },
  { label: "Finish", icon: Sparkles },
];

export function HomeCustomizeExpert() {
  return (
    <section className="bh-section bg-bh-cream/60">
      <PageContainer className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        {/* LEFT: Customise banner */}
        <div className="relative flex min-h-[200px] overflow-hidden rounded-3xl bg-bh-green-dark shadow-sm md:min-h-[230px] lg:aspect-[2.6/1] lg:min-h-0">
          <Image
            src="/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png"
            alt="Custom green armchair"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/90 via-bh-green-dark/40 to-transparent" />

          {/* Text + CTA */}
          <div className="relative z-[2] flex h-full flex-col justify-center gap-3 p-6 md:p-8">
            <div className="max-w-[15rem]">
              <h2 className="font-display text-xl font-semibold leading-tight text-white md:text-2xl">
                Customise
                <br />
                Your Furniture
              </h2>
              <p className="mt-2 text-xs text-white/80 md:text-sm">
                Choose size, material, colour and design to create furniture that fits your
                space and style.
              </p>
            </div>

            <Button
              href="/customize"
              variant="secondary"
              className="w-fit rounded-full border-0 bg-white !text-bh-green shadow-sm hover:bg-bh-cream"
              icon={<ArrowRight className="h-4 w-4 text-bh-green" />}
              iconPosition="right"
            >
              Start Customizing
            </Button>
          </div>

          {/* Vertical option menu, right side */}
          <div className="absolute right-5 top-1/2 z-[2] flex -translate-y-1/2 flex-col gap-2 md:right-7">
            {OPTIONS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-white bh-glass-on-dark transition hover:bg-white/20"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: Talk to an expert */}
        <div className="flex min-h-[200px] overflow-hidden rounded-3xl bg-bh-warm-white shadow-sm md:min-h-[230px] lg:aspect-[2.6/1] lg:min-h-0">
          <div className="flex w-[55%] flex-col justify-center gap-2 p-6 md:w-1/2 md:p-8">
            <h2 className="font-display text-xl font-semibold text-bh-charcoal md:text-2xl">
              Need Help Choosing?
            </h2>
            <p className="text-xs text-bh-muted md:text-sm">
              Talk to our furniture expert and get personalised recommendations for your home.
            </p>
            <Button
              href="/contact"
              className="mt-3 w-fit rounded-full"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Talk to an Expert
            </Button>
          </div>

          <div className="relative w-[45%] md:w-1/2">
            <Image
              src="/BestHomz/Homepage/banners/28-banner-help-consultant.png"
              alt="Furniture consultant"
              fill
              className="object-cover object-[85%_20%]"
              sizes="(max-width: 1024px) 45vw, 25vw"
            />
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-bh-warm-white to-transparent" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}