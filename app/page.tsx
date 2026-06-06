import Preloader from "@/components/ui/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import Testimonials from "@/components/sections/Testimonials";
import Storytelling from "@/components/sections/Storytelling";
import Manifesto from "@/components/sections/Manifesto";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="flex flex-col min-h-screen">
        <HeroSection />
        <Testimonials />
        <Storytelling />
        <Manifesto />
        <Projects />
        <Services />
        <TechStack />
        <CTASection />
        <FAQ />
      </main>
    </>
  );
}
