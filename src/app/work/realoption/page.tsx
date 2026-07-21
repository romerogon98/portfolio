import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { realoption } from "@/content/work/realoption";

export const metadata = {
  title: `${realoption.title} — ${realoption.subtitle} | Gonzalo Romero`,
  description: realoption.intro,
};

export default function RealoptionPage() {
  return (
    <>
      <Nav light={realoption.theme === "light"} />
      <CaseStudy data={realoption} />
    </>
  );
}
