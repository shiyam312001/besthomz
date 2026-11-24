import { CustomizeView } from "@/components/customize/CustomizeView";
import { fetchActiveCategories } from "@/lib/catalog/categories";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Custom Furniture in Chennai",
  description: "Create custom furniture with Best Homz. Choose size, material, colour and finish for sofas, beds, dining and office furniture.",
  path: "/customize",
  keywords: [
    "custom furniture Chennai",
    "made to order furniture Chennai",
    "custom sofa Chennai",
    "custom bed Chennai",
    "custom dining table Chennai",
  ],
});

export default async function CustomizePage() {
  const categories = await fetchActiveCategories();
  return <CustomizeView categories={categories} />;
}
