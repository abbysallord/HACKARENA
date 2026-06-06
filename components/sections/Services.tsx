"use client";

import { useEffect, useRef } from "react";
import { Code2, MonitorPlay, Layers } from "lucide-react";
import { gsap } from "gsap";

const services = [
  {
    title: "Web Engineering",
    icon: Code2,
    desc: "High-performance React & Next.js applications.",
    benefits: ["Sub-second Load Times", "SEO Optimized", "Scalable Architecture"],
  },
  {
    title: "WebGL & 3D",
    icon: MonitorPlay,
    desc: "Immersive cinematic experiences running in the browser.",
    benefits: ["60fps Performance", "Interactive Storytelling", "Graceful Degradation"],
  },
  {
    title: "Digital Design",
    icon: Layers,
    desc: "Brutalist, minimalist, and premium UI/UX design.",
    benefits: ["Conversion Focused", "Design Systems", "Brand Identity"],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".service-card") as HTMLElement[];

    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(card, {
        rotationY: x * 0.05,
        rotationX: -y * 0.05,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = (card: HTMLElement) => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => handleMouseMove(e, card);
      const onLeave = () => handleMouseLeave(card);
      
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--background)] border-t border-black/5">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[var(--color-brand-orange)] mb-4">
            Capabilities
          </h2>
          <h3 className="text-4xl md:text-6xl font-heading font-bold text-[var(--foreground)]">
            What We Do
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="service-card group relative bg-white border border-black/10 p-10 flex flex-col gap-6 overflow-hidden transition-colors duration-500 hover:bg-black cursor-pointer shadow-sm hover:shadow-2xl"
            >
              {/* Animated orange accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[var(--color-brand-orange)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left z-20" />

              <s.icon className="w-12 h-12 text-[var(--color-brand-orange)] relative z-10 transition-transform duration-500 group-hover:scale-110" />
              
              <h4 className="text-2xl font-heading font-bold text-black group-hover:text-white transition-colors duration-500 relative z-10">
                {s.title}
              </h4>
              
              <p className="text-black/70 group-hover:text-white/70 transition-colors duration-500 leading-relaxed relative z-10">
                {s.desc}
              </p>
              
              <div className="mt-auto pt-6 border-t border-black/10 group-hover:border-white/10 transition-colors duration-500 relative z-10">
                <ul className="flex flex-col gap-3">
                  {s.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-black/80 group-hover:text-white/80 transition-colors duration-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-orange)] shrink-0 transition-transform duration-500 group-hover:scale-150" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
