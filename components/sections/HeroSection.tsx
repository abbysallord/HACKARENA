"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup 3D perspective for tilt effects
      gsap.set(containerRef.current, { perspective: 1200 });
      gsap.set(textRef.current, { transformOrigin: "center center" });

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

      // Smooth ambient scaling for the orange gradient orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          scale: 1.3,
          opacity: 0.15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        });
      }
    }, containerRef);

    // Advanced Interactive Mouse Engine (Restricted to Desktop)
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      // 1. Orb acts as an aggressive flashlight tracking the mouse
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          x: x * (window.innerWidth / 2.5),
          y: y * (window.innerHeight / 2.5),
          duration: 1.5,
          ease: "power3.out",
        });
      }

      // 2. 3D Tilt on the massive Typography
      if (textRef.current) {
        gsap.to(textRef.current, {
          x: x * -40,
          y: y * -40,
          rotationY: x * 15,
          rotationX: -y * 15,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    };

    // Only attach mouse tracking if the device has a physical cursor (Desktop)
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (isDesktop) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
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

      {/* Massive Background Typography */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none z-10 -mt-24 md:-mt-32 will-change-transform"
      >
        <h1 className="text-[18vw] md:text-[15vw] leading-[0.8] font-heading font-black uppercase tracking-tighter text-black w-full break-words">
          HACK<br />ARENA
        </h1>
      </div>

      {/* Foreground CTA */}
      <div className="absolute bottom-48 md:bottom-40 lg:bottom-44 z-20 flex flex-col items-center w-full px-4 sm:px-6 pointer-events-auto">
        <button
          onClick={() => document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative overflow-hidden bg-black text-white px-6 py-3 md:px-10 md:py-5 rounded-full text-[10px] sm:text-xs md:text-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.2)] will-change-transform"
        >
          <span className="relative z-10 pointer-events-none">Start a Project</span>
          <div className="absolute inset-0 bg-[var(--color-brand-orange)] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-in-out z-0 pointer-events-none" />
        </button>
      </div>

    </section>
  );
}
