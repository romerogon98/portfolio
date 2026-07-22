import CaseStudy from "@/components/CaseStudy";
import { nextPublicCase } from "@/content/work/registry";
import Nav from "@/components/Nav";
import { dicaba } from "@/content/work/dicaba";

export const metadata = {
  title: `${dicaba.title} — ${dicaba.subtitle} | Gonzalo Romero`,
  description: dicaba.intro,
};

export default function DicabaPage() {
  return (
    <>
      <Nav light={dicaba.theme === "light"} />
      <CaseStudy data={dicaba} next={nextPublicCase("dicaba")} />
    </>
  );
}
