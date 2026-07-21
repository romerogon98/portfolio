import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { entuitive } from "@/content/work/entuitive";

export const metadata = {
  title: `${entuitive.title} — ${entuitive.subtitle} | Gonzalo Romero`,
  description: entuitive.intro,
};

export default function EntuitivePage() {
  return (
    <>
      <Nav light={entuitive.theme === "light"} />
      <CaseStudy data={entuitive} />
    </>
  );
}
