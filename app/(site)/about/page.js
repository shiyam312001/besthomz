import { AboutView } from "@/components/about/AboutView";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "About Best Homz Furniture",
  description: "Learn about Best Homz, Chennai's premium furniture showroom offering curated designs, custom furniture and expert home furnishing guidance.",
  path: "/about",
  keywords: [
    "about Best Homz",
    "Best Homz Chennai",
    "premium furniture showroom Chennai",
  ],
});

export default function AboutPage() {
  return <AboutView />;
}
