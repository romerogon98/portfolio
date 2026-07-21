import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { battery } from "@/content/work/battery";

export const metadata = {
  title: `${battery.title} — ${battery.subtitle} | Gonzalo Romero`,
  description: battery.intro,
};

export default function BatteryPage() {
  return (
    <>
      <Nav light={battery.theme === "light"} />
      <CaseStudy data={battery} />
    </>
  );
}
