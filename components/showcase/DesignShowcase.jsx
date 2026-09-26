"use client";

import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio } from "@/components/ui/Radio";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryCard } from "@/components/product/CategoryCard";
import { RoomCard } from "@/components/room/RoomCard";
import { CollectionCard } from "@/components/collection/CollectionCard";
import { QuoteCTA } from "@/components/quote/QuoteCTA";
import { CardSkeleton, PageSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useToast } from "@/components/providers/ToastProvider";
import {
  showcaseCategories,
  showcaseCollections,
  showcaseProducts,
  showcaseRooms,
} from "@/data/showcase";

export function DesignShowcase() {
  const { toast } = useToast();

  return (
    <>
      <Header />
      <main className="pb-safe-nav md:pb-0">
        <PageContainer className="py-8 md:py-12">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Design System", href: "/" },
            ]}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bh-muted">
            Phase 3 — Visual foundation
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
            Best Homz design system
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-bh-muted md:text-base">
            Temporary showcase for layout, tokens, and components. Full homepage comes in a later phase.
          </p>

          <section className="bh-section border-b border-bh-border">
            <SectionHeading title="Buttons" description="Primary actions and secondary styles." />
            <div className="flex flex-wrap gap-3">
              <Button>Get a Quote</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="glass">Glass</Button>
              <Button variant="whatsapp">WhatsApp</Button>
              <Button loading>Loading</Button>
              <Button
                variant="outline"
                onClick={() => toast("Quote submitted")}
              >
                Toast demo
              </Button>
            </div>
          </section>

          <section className="bh-section border-b border-bh-border">
            <SectionHeading
              eyebrow="Premium"
              title="Glass & badges"
              description="Subtle glass panels for overlays and featured UI."
            />
            <div className="grid gap-4 md:grid-cols-3">
              <GlassCard className="p-5">
                <p className="text-sm font-medium">Default glass</p>
                <p className="mt-1 text-xs text-bh-muted">Size, Material, Colour, Finish</p>
              </GlassCard>
              <GlassCard variant="strong" className="p-5">
                <p className="text-sm font-medium">Strong glass</p>
              </GlassCard>
              <GlassCard variant="dark" className="p-5">
                <p className="text-sm font-medium text-white">Dark glass</p>
              </GlassCard>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="new">New</Badge>
              <Badge tone="popular">Popular</Badge>
              <Badge tone="bestseller">Best Seller</Badge>
              <Badge tone="featured">Featured</Badge>
              <Badge tone="customizable">Customizable</Badge>
            </div>
          </section>

          <section className="bh-section border-b border-bh-border">
            <SectionHeading
              title="Shop by category"
              actionHref="/furniture"
              actionLabel="View all furniture"
            />
            <div className="bh-scroll-x -mx-1 px-1 pb-2 md:grid md:grid-cols-4 md:gap-4 lg:grid-cols-8 md:overflow-visible">
              {showcaseCategories.map((cat) => (
                <CategoryCard key={cat.name} {...cat} className="md:w-auto" />
              ))}
            </div>
          </section>

          <section className="bh-section border-b border-bh-border">
            <SectionHeading title="Featured products" description="Quote-first — no prices displayed." />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {showcaseProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>

          <section className="bh-section border-b border-bh-border">
            <SectionHeading title="Shop by room" />
            <div className="bh-scroll-x md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
              {showcaseRooms.map((room) => (
                <RoomCard key={room.name} {...room} className="w-[72vw] max-w-xs md:w-auto" />
              ))}
            </div>
          </section>

          <section className="bh-section border-b border-bh-border">
            <SectionHeading title="Collections" />
            <div className="grid gap-4 md:grid-cols-3">
              {showcaseCollections.map((col) => (
                <CollectionCard key={col.name} {...col} />
              ))}
            </div>
          </section>

          <section className="bh-section border-b border-bh-border space-y-6">
            <QuoteCTA variant="dark" />
            <QuoteCTA variant="light" title="Need help choosing?" primaryLabel="Talk to an Expert" secondaryLabel={null} />
            <QuoteCTA
              variant="glass"
              title="Glass variant"
              description="For floating panels over imagery."
              secondaryLabel={null}
            />
          </section>

          <section className="bh-section border-b border-bh-border">
            <SectionHeading title="Form controls" />
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Full name" htmlFor="ds-name" required>
                <Input id="ds-name" placeholder="Your name" />
              </FormField>
              <FormField label="Furniture type" htmlFor="ds-type">
                <Select id="ds-type" defaultValue="">
                  <option value="" disabled>Select type</option>
                  <option value="sofa">Sofa</option>
                  <option value="bed">Bed</option>
                </Select>
              </FormField>
              <FormField label="Message" htmlFor="ds-msg" className="md:col-span-2">
                <Textarea id="ds-msg" placeholder="Tell us about your space..." />
              </FormField>
              <Checkbox id="ds-custom" label="I need customization" />
              <div className="flex gap-4">
                <Radio name="contact" id="ds-phone" label="Phone" defaultChecked />
                <Radio name="contact" id="ds-email" label="Email" />
              </div>
            </div>
            <Button className="mt-6" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
              Send Message
            </Button>
          </section>

          <section className="bh-section">
            <SectionHeading title="States" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <CardSkeleton />
                <PageSkeleton />
              </div>
              <div className="space-y-4">
                <EmptyState
                  title="Your wishlist is empty"
                  description="Save pieces you love and request a quote anytime."
                  actionLabel="Explore furniture"
                  actionHref="/furniture"
                />
                <ErrorState onRetry={() => toast("Retrying…", { variant: "error" })} />
              </div>
            </div>
          </section>
        </PageContainer>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
