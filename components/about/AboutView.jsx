import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutMissionVision } from "@/components/about/AboutMissionVision";
import { AboutCoreValues } from "@/components/about/AboutCoreValues";
import { AboutCrafted } from "@/components/about/AboutCrafted";
import { AboutShowroom } from "@/components/about/AboutShowroom";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { AboutBottomCta } from "@/components/about/AboutBottomCta";

export function AboutView() {
  return (
    <div className="bg-bh-warm-white">
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutMissionVision />
      <AboutCoreValues />
      <AboutCrafted />
      <AboutShowroom />
      <AboutTestimonials />
      <AboutBottomCta />
    </div>
  );
}
