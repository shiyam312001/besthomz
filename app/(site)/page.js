import { HomeView } from "@/components/home/HomeView";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Premium Furniture in Chennai",
  description: "Shop premium sofas, beds, dining, office furniture and custom furniture at Best Homz showroom in Aminjikarai, Chennai.",
  path: "/",
  keywords: [
    "furniture showroom Chennai",
    "premium furniture Chennai",
    "buy furniture Chennai",
    "custom furniture Chennai",
    "Best Homz Aminjikarai",
  ],
});

export default function HomePage() {
  return <HomeView />;
}
