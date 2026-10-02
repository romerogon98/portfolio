import CaseStudy from "@/components/CaseStudy";
import { nextPublicCase } from "@/content/work/registry";
import Nav from "@/components/Nav";
import { pinamar } from "@/content/work/pinamar";

export const metadata = {
  title: `${pinamar.title} — ${pinamar.subtitle} | Gonzalo Romero`,
  description: pinamar.intro,
};

export default function PinamarPage() {
  return (
    <>
      <Nav light={pinamar.theme === "light"} />
      <CaseStudy data={pinamar} next={nextPublicCase("pinamar")} />
    </>
  );
}
