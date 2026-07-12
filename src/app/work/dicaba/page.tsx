import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { dicaba } from "@/content/work/dicaba";

export const metadata = {
  title: `${dicaba.title} — ${dicaba.subtitle} | Gonzalo Romero`,
  description: dicaba.intro,
};

export default function DicabaPage() {
  return (
    <>
      <Nav />
      <CaseStudy data={dicaba} />
    </>
  );
}
