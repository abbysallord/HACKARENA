"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth GSAP Parallax perfectly synced with Lenis virtual scroll
      if (textRef.current && containerRef.current) {
        gsap.to(textRef.current, {
          yPercent: 50, // Moves down slightly as you scroll
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true, // Smooth scrub locks it to the scrollbar
          }
        });
      }

      // Smooth ambient movement for the orange gradient orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          xPercent: 15,
          yPercent: -15,
          scale: 1.2,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true, // Forces GPU hardware acceleration to prevent jitter
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--background)]">
      
      {/* Subtle Animated Orange Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div 
          ref={orbRef}
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[var(--color-brand-orange)] opacity-10 blur-[120px] will-change-transform" 
        />
      </div>

      {/* Massive Background Typography - Pushed up with -mt-24 */}
      <div 
        ref={textRef} 
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none z-10 -mt-24"
      >
        <h1 className="text-[15vw] leading-[0.8] font-heading font-black uppercase tracking-tighter text-black w-full break-words">
          HACK<br/>ARENA
        </h1>
      </div>

      {/* Foreground CTA */}
      <div className="absolute bottom-24 md:bottom-32 z-20 flex flex-col items-center w-full px-6">
        <p className="text-lg md:text-xl font-bold mb-6 text-black/70 max-w-lg text-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-black/5">
          Engineering cinematic digital platforms for elite brands.
        </p>
        <button className="group relative overflow-hidden bg-black text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          <span className="relative z-10">Start a Project</span>
          <div className="absolute inset-0 bg-[var(--color-brand-orange)] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-in-out z-0" />
        </button>
      </div>

    </section>
  );
}
