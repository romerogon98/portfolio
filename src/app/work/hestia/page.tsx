import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { hestia } from "@/content/work/hestia";

export const metadata = {
  title: `${hestia.title} — ${hestia.subtitle} | Gonzalo Romero`,
  description: hestia.intro,
};

export default function HestiaPage() {
  return (
    <>
      <Nav light={hestia.theme === "light"} />
      <CaseStudy data={hestia} />
    </>
  );
}
