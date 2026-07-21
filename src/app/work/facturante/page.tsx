import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { facturante } from "@/content/work/facturante";

export const metadata = {
  title: `${facturante.title} — ${facturante.subtitle} | Gonzalo Romero`,
  description: facturante.intro,
};

export default function FacturantePage() {
  return (
    <>
      <Nav light={facturante.theme === "light"} />
      <CaseStudy data={facturante} />
    </>
  );
}
