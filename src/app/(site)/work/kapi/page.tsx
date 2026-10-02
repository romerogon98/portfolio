import CaseStudy from "@/components/CaseStudy";
import { nextPublicCase } from "@/content/work/registry";
import Nav from "@/components/Nav";
import { kapi } from "@/content/work/kapi";

export const metadata = {
  title: `${kapi.title} — ${kapi.subtitle} | Gonzalo Romero`,
  description: kapi.intro,
};

export default function KapiPage() {
  return (
    <>
      <Nav light={kapi.theme === "light"} />
      <CaseStudy data={kapi} next={nextPublicCase("kapi")} />
    </>
  );
}
