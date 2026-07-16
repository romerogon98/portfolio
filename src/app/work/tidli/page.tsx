import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { tidli } from "@/content/work/tidli";

export const metadata = {
  title: `${tidli.title} — ${tidli.subtitle} | Gonzalo Romero`,
  description: tidli.intro,
};

export default function TidliPage() {
  return (
    <>
      <Nav />
      <CaseStudy data={tidli} />
    </>
  );
}
