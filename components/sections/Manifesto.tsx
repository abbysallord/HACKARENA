"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const text = "IF YOUR DIGITAL PRESENCE ISN'T A WEAPON, IT'S A LIABILITY.";
const attribution = "— UNKNOWN ARCHITECT";

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const attrRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !attrRef.current) return;

    const ctx = gsap.context(() => {
      const words = textRef.current!.querySelectorAll('.word');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Increased pin duration
          pin: true,
          pinSpacing: true, // Explicitly enforce pin spacing
          scrub: true, // Use exactly true to remove all catch-up lag
        }
      });

      tl.fromTo(words, 
        { opacity: 0.1 },
        {
          opacity: 1,
          duration: 0.2, // Explicitly fast duration
          stagger: 0.05, 
          ease: "none",
        }
      ).fromTo(attrRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        "-=0.1"
      )
      // A brief scroll pause to ensure the text holds focus just long enough before unpinning
      .to({}, { duration: 0.6 });
    }, containerRef);

    return () => {
      ctx.revert(); // Safely reverts DOM changes (like pin-spacers) before React unmounts
    };
  }, []);

  return (
    <div className="w-full">
      <section ref={containerRef} className="h-screen w-full bg-[var(--background)] flex items-center justify-center px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-end max-w-[90vw] md:max-w-6xl mx-auto">
          <h2 ref={textRef} className="relative z-10 text-5xl md:text-8xl lg:text-[7vw] font-heading font-black tracking-tighter leading-[1.1] uppercase text-[var(--foreground)] text-left">
            {text.split(' ').map((word, i) => {
              // Add highlight color to specific impactful words
              const isHighlight = ["WEAPON,", "LIABILITY."].includes(word);
              
              return (
                <span key={i} className="word inline-block mr-3 md:mr-[1.5vw] mb-2 md:mb-4">
                  <span className={isHighlight ? "text-[var(--color-brand-orange)]" : ""}>
                    {word}
                  </span>
                </span>
              );
            })}
          </h2>
          <p ref={attrRef} className="mt-8 md:mt-12 text-xl md:text-3xl font-bold tracking-widest text-[var(--foreground)]/30 uppercase text-right">
            {attribution}
          </p>
        </div>
      </section>
    </div>
  );
}
