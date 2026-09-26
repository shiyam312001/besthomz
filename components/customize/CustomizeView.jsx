import { CustomizeHero } from "@/components/customize/CustomizeHero";
import { CustomizeConfigurator } from "@/components/customize/CustomizeConfigurator";
import { CustomizeHelp } from "@/components/customize/CustomizeHelp";
import { CustomizeInspired } from "@/components/customize/CustomizeInspired";
import { CustomizeHowWorks } from "@/components/customize/CustomizeHowWorks";
import { CustomizeBottomCta } from "@/components/customize/CustomizeBottomCta";

export function CustomizeView() {
  return (
    <div className="bg-bh-warm-white">
      <CustomizeHero />
      <CustomizeConfigurator />
      <CustomizeHelp />
      <CustomizeInspired />
      <CustomizeHowWorks />
      <CustomizeBottomCta />
    </div>
  );
}
