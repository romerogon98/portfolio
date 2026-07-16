import CaseStudy from "@/components/CaseStudy";
import Nav from "@/components/Nav";
import { kapi } from "@/content/work/kapi";

export const metadata = {
  title: `${kapi.title} — ${kapi.subtitle} | Gonzalo Romero`,
  description: kapi.intro,
};

export default function KapiPage() {
  return (
    <>
      <Nav />
      <CaseStudy data={kapi} />
    </>
  );
}
