"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Storytelling() {
  const containerRef = useRef<HTMLElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
        },
      });

      // Animate the orange wipe covering the screen
      tl.to(wipeRef.current, {
        scaleY: 1,
        transformOrigin: "bottom",
        ease: "power2.inOut",
        duration: 1,
      })
      // As the wipe comes up, fade out text1
      .to(text1Ref.current, {
        opacity: 0,
        duration: 0.5,
      }, "-=0.5")
      // Fade in text 2 as the wipe finishes
      .to(text2Ref.current, {
        opacity: 1,
        duration: 0.5,
      })
      // Brief scroll pause to hold "WE BRING FLOW" on screen before unpinning
      .to({}, { duration: 0.4 });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center">
      
      {/* Background layer (The Problem) */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <h2 ref={text1Ref} className="text-6xl md:text-[8vw] font-heading font-black text-white leading-[0.85] tracking-tighter text-center max-w-[90vw]">
          THE INTERNET<br/>IS <span className="relative inline-block px-4 mx-4 text-black z-10"><span className="absolute inset-0 bg-red-500 -z-10 -rotate-2 scale-110"></span>BROKEN</span>.
        </h2>
      </div>

      {/* The Wipe Layer (The Solution) */}
      <div 
        ref={wipeRef} 
        className="absolute inset-0 flex items-center justify-center bg-[var(--color-brand-orange)] scale-y-0"
      >
        <h2 ref={text2Ref} className="text-6xl md:text-[8vw] font-heading font-black text-black leading-[0.85] tracking-tighter text-center max-w-[90vw] opacity-0">
          WE BRING<br/><span className="text-white">FLOW</span>.
        </h2>
      </div>

    </section>
  );
}
