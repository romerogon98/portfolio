import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HistoryReveal from "@/components/HistoryReveal";
import About from "@/components/About";
import WorkGallery from "@/components/WorkGallery";
import Haul from "@/components/Haul";
import Stack from "@/components/Stack";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />

      {/* Page content — sits above the pinned Footer (z-10) and scrolls over it. */}
      <main className="relative z-10 bg-black">
        <Hero />
        <HistoryReveal />
        <About />
        <WorkGallery />
        <Haul />
        <Stack />
        <Skills />
      </main>

      {/* Reveal room + #contact anchor: as this scrolls past, the Footer shows. */}
      <div id="contact" aria-hidden className="pointer-events-none h-screen" />
      <Footer />
    </>
  );
}
