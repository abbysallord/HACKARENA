"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "They didn't just build a website; they engineered an experience.",
    author: "Sarah J. — CEO, TechFlow",
    img: "/projects/1.jpg"
  },
  {
    quote: "The WebGL integration is absolutely flawless.",
    author: "Mark T. — Founder, Voxel",
    img: "/projects/2.jpg"
  },
  {
    quote: "Minimalist, brutalist, and perfectly executed.",
    author: "Elena R. — Director, DesignCo",
    img: "/projects/3.jpg"
  },
  {
    quote: "The smoothest scroll animations I've ever seen.",
    author: "David L. — CTO, NextGen",
    img: "/projects/1.jpg"
  },
  {
    quote: "Premium work delivered ahead of schedule.",
    author: "Anita P. — PM, Innovate",
    img: "/projects/2.jpg"
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Infinite seamless marquee
      marqueeTweenRef.current = gsap.to(wrapperRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 35, // Smooth, slow automatic crawl
        repeat: -1,
      });

      // Parallax effect: Section moves down at half speed so the next section overlays it
      gsap.to(sectionRef.current, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handlePause = () => {
    if (marqueeTweenRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 0, duration: 0.8, ease: "power2.out" });
    }
  };

  const handleResume = () => {
    if (marqueeTweenRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.in" });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex flex-col justify-center py-20"
    >
      <div className="absolute top-20 w-full text-center z-20 px-6 flex justify-between uppercase font-bold tracking-widest text-[var(--color-brand-orange)] text-sm pointer-events-none">
        <span>Client Feedback</span>
        <div className="flex flex-col items-end">
          <span>Voices —&gt;</span>
          <span className="text-[9px] mt-1 text-[var(--foreground)]/40 md:hidden tracking-[0.2em]">(Hold to pause)</span>
        </div>
      </div>

      <div 
        className="flex w-full items-center py-20 cursor-grab active:cursor-grabbing"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
        onTouchCancel={handleResume}
      >
        <div ref={wrapperRef} className="flex w-max">
          {/* Duplicate array for seamless infinite scrolling loop */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[85vw] md:w-[800px] flex flex-col flex-shrink-0 mx-6 md:mx-16"
            >
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-heading font-black text-[var(--foreground)] mb-10 leading-[1.1] tracking-tighter">
                "{t.quote}"
              </h3>
              
              <div className="flex items-center gap-6 mt-auto">
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border border-black/10 grayscale hover:grayscale-0 transition-all duration-500">
                  <Image 
                    src={t.img} 
                    alt={t.author} 
                    fill 
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <span className="text-[var(--foreground)]/50 font-bold uppercase tracking-widest text-xs md:text-sm">
                  {t.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
