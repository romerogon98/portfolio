import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { etixen } from "@/content/work/etixen";

export const metadata = {
  title: `${etixen.title} — ${etixen.subtitle} | Gonzalo Romero`,
  description: etixen.intro,
};

export default function EtixenPage() {
  return (
    <>
      <Nav light={etixen.theme === "light"} />
      <CaseStudy data={etixen} />
    </>
  );
}
