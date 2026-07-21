import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { gm2 } from "@/content/work/gm2";

export const metadata = {
  title: `${gm2.title} — ${gm2.subtitle} | Gonzalo Romero`,
  description: gm2.intro,
};

export default function GM2Page() {
  return (
    <>
      <Nav light={gm2.theme === "light"} />
      <CaseStudy data={gm2} />
    </>
  );
}
