import { CustomizeView } from "@/components/customize/CustomizeView";
import { fetchActiveCategories } from "@/lib/catalog/categories";

export const metadata = {
  title: "Customize Furniture",
  description: "Configure custom furniture with Best Homz — size, material, colour and finish. Request a quote for your design.",
};

export default async function CustomizePage() {
  const categories = await fetchActiveCategories();
  return <CustomizeView categories={categories} />;
}
