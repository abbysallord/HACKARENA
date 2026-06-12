"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our portfolio of brutalist digital architecture and immersive WebGL experiences.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !subRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into character spans for independent staggering
      const text = textRef.current!.innerText;
      textRef.current!.innerHTML = "";
      
      const chars = text.split("").map(char => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char;
        span.className = "inline-block";
        textRef.current!.appendChild(span);
        return span;
      });

      const tl = gsap.timeline();

      // 1. Character-by-character slide up reveal
      tl.fromTo(chars, 
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: "power4.out", delay: 0.2 }
      );

      // 2. Subtext fade in
      tl.fromTo(subRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      );

      // 3. Ambient Breathing Orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          scale: 1.5,
          opacity: 0.15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-center overflow-hidden px-6">
      
      {/* Ambient Glow & Watermark Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none">
        <div 
          ref={orbRef}
          className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[var(--color-brand-orange)] opacity-5 blur-[100px] will-change-transform" 
        />
        <div className="absolute opacity-5 lg:opacity-10 grayscale">
          <Image 
            src="/projects/logo.png" 
            alt="HackArena Watermark" 
            width={800} 
            height={800} 
            className="w-[80vw] max-w-[800px] object-contain"
            unoptimized={true}
            quality={100}
            priority
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Hidden Overflow Wrapper for the slide-up text reveal */}
        <div className="overflow-hidden pb-4 md:pb-8 px-4 -mx-4">
          <h1 ref={textRef} className="text-6xl md:text-[10vw] font-heading font-black uppercase tracking-tighter leading-[0.85] text-[var(--foreground)]">
            COMING SOON
          </h1>
        </div>
        
        <p ref={subRef} className="mt-8 text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm md:text-base opacity-0">
          Compiling Architectures <span className="animate-pulse">...</span>
        </p>
      </div>
    </main>
  );
}
