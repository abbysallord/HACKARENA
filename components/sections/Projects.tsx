"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    title: "Neon Engine", 
    src: "/projects/1.jpg",
    industry: "Fintech Platform",
    client: "Nexus Corp"
  },
  { 
    title: "Aura Chrome", 
    src: "/projects/2.jpg",
    industry: "WebGL E-Commerce",
    client: "Aura Studios"
  },
  { 
    title: "Velocity Iron", 
    src: "/projects/3.jpg",
    industry: "Enterprise SaaS",
    client: "Velocity Inc"
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headerRef.current) return;
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];

      // Ensure cards are positioned correctly before timeline starts
      cards.forEach((card, index) => {
        if (index !== 0) {
          gsap.set(card, { yPercent: 100 });
        }
      });

      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${projects.length * 100}%`, // e.g. 300% scroll distance
          pin: true,
          pinSpacing: true, // Explicitly enforce pin spacing
          anticipatePin: 1, // Fixes the minute pinning glitch
          scrub: true,
        }
      });

      cards.forEach((card, index) => {
        // The first card is already fully visible, we don't translate it up.
        // But we do want a pause for it before the next card animates.
        if (index === 0) {
          tl.to({}, { duration: 1 }); // Pause for the 1st card
          return;
        }

        // Animate the card sliding up from below
        tl.to(card, 
          { yPercent: 0, duration: 1, ease: "none" }
        );
        
        // Pause after it finishes sliding
        tl.to({}, { duration: 1 });
      });
    }, containerRef);

    return () => {
      ctx.revert(); // Safely reverts DOM changes before React unmounts
    };
  }, []);

  return (
    <div className="w-full"> {/* Wrapper to isolate pin-spacer from Flex parent */}
      <section ref={containerRef} className="relative h-screen w-full bg-[var(--background)] overflow-hidden">
      
      {/* Absolute Header - higher z-index so it stays above the stacking cards */}
      <div ref={headerRef} className="absolute top-0 left-0 w-full z-50 pointer-events-none pt-12 px-6 md:px-12 mix-blend-difference">
        <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase text-white">
          SELECTED<br/>WORKS.
        </h2>
      </div>

      <div className="relative w-full h-full">
        {projects.map((p, i) => (
          <div 
            key={i} 
            className="project-card absolute top-0 left-0 w-full h-full flex items-end pb-24 px-6 md:px-24 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            style={{ zIndex: i + 10 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={p.src}
                alt={p.title}
                fill
                unoptimized={true}
                sizes="100vw"
                className="object-cover object-center"
                priority={i === 0}
              />
            </div>
            
            {/* Overlay Gradient for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

            {/* Clean Typography Metadata */}
            <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 text-white/70 font-bold uppercase tracking-widest text-sm mb-4">
                  <span>{p.client}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-orange)]" />
                  <span>{p.industry}</span>
                </div>
                <h3 className="text-6xl md:text-[8vw] font-heading font-black text-white uppercase tracking-tighter leading-none">
                  {p.title}
                </h3>
              </div>

              <button className="group flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 backdrop-blur-md text-white shrink-0">
                <span className="sr-only">View Case Study</span>
                <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
