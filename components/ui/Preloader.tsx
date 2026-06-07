"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // Only show preloader on initial visit
    if (sessionStorage.getItem("hasVisited")) {
      setShouldShow(false);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("hasVisited", "true");
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.6, // Faster slide up
            ease: "power4.inOut",
          });
        },
      });

      tl.to(progressRef.current, {
        width: "100%",
        duration: 0.5, // Much faster loading bar
        ease: "power2.inOut",
      })
        .to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
        }, "-=0.2")
        .to(progressRef.current, {
          height: "100vh",
          top: 0,
          backgroundColor: "#ffffff",
          duration: 0.4, // Faster flash
          ease: "power4.inOut",
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!shouldShow) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative z-10 flex flex-col items-center">
        <div ref={textRef} className="mb-8">
          <Image 
            src="/projects/logo.png" 
            alt="HackArena" 
            width={300} 
            height={80} 
            className="h-10 md:h-16 w-auto object-contain"
            priority
          />
        </div>
        <div className="h-[2px] w-48 bg-black/10 overflow-hidden relative rounded-full">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full w-0 bg-[var(--color-brand-orange)]"
          />
        </div>
      </div>
    </div>
  );
}
