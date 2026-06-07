"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const philosophyText = "We don't use templates. We don't ship heavy, unoptimized code. Every pixel we place and every shader we write is meticulously crafted to ensure flawless performance and stunning aesthetics. We build for the future of the web.";

const coreValues = [
  {
    id: "01",
    title: "ZERO TEMPLATES",
    desc: "Every project is engineered from scratch. We don't recycle code. We build bespoke digital infrastructure tailored to your exact specifications.",
  },
  {
    id: "02",
    title: "60FPS NATIVE",
    desc: "Performance is not an afterthought. It is a baseline. We optimize every shader, timeline, and DOM node to ensure absolute fluidity.",
  },
  {
    id: "03",
    title: "BRUTALIST UX",
    desc: "Form follows function, but aesthetic is never sacrificed. We strip away the unnecessary to reveal the raw, powerful core of your platform.",
  }
];

export default function AboutUs() {
  const containerRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation
      const tl = gsap.timeline();
      
      tl.fromTo(heroTextRef.current, 
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
      )
      .fromTo(heroImgRef.current,
        { scale: 1.2, opacity: 0, filter: "grayscale(100%) blur(10px)" },
        { scale: 1, opacity: 1, filter: "grayscale(100%) blur(0px)", duration: 1.5, ease: "power3.out" },
        "-=0.8"
      );

      // 2. Hero Image Parallax on Scroll
      gsap.to(heroImgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // 3. Philosophy Text Reveal
      if (philosophyRef.current) {
        const words = philosophyRef.current.querySelectorAll('.word');
        gsap.fromTo(words, 
          { opacity: 0.1, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: "top 80%",
              end: "bottom 50%",
              scrub: true,
            }
          }
        );
      }

      // 4. Value Grid Entrance
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.value-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // 5. Footer Marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[var(--background)] overflow-hidden">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-[90vh] md:h-screen w-full flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32 pt-32">
        <div ref={heroImgRef} className="absolute inset-0 z-0 opacity-0">
          <Image 
            src="/projects/3.jpg" 
            alt="Engineering Realities" 
            fill 
            className="object-cover object-center"
            unoptimized={true}
            quality={100}
            priority
          />
          {/* Brutalist Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full overflow-hidden pb-12 md:pb-24 px-4 -mx-4">
          <h1 ref={heroTextRef} className="text-5xl min-[400px]:text-6xl md:text-[10vw] font-heading font-black uppercase tracking-tighter leading-[0.85] text-[var(--foreground)] drop-shadow-2xl pb-6">
            WE ENGINEER<br/>
            <span className="text-[var(--color-brand-orange)]">REALITIES.</span>
          </h1>
        </div>
      </section>

      {/* 2. GSAP Scroll-Revealed Philosophy */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-bold tracking-widest uppercase text-[var(--color-brand-orange)] mb-12">
            The Philosophy —&gt;
          </p>
          <p ref={philosophyRef} className="text-3xl md:text-5xl lg:text-7xl font-heading font-black tracking-tighter leading-[1.1] uppercase text-[var(--foreground)]">
            {philosophyText.split(' ').map((word, i) => (
              <span key={i} className="word inline-block mr-2 md:mr-[1vw] mb-2">
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* 3. Brutalist Value Grid */}
      <section className="py-32 px-6 md:px-12 border-t border-[var(--foreground)]/10">
        <div className="max-w-7xl mx-auto" ref={gridRef}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {coreValues.map((value) => (
              <div 
                key={value.id}
                className="value-card group relative p-10 border border-[var(--foreground)]/20 bg-[var(--background)] hover:bg-[var(--foreground)] transition-colors duration-500 overflow-hidden rounded-[2rem]"
              >
                <span className="block text-xl font-bold tracking-widest text-[var(--foreground)]/30 group-hover:text-[var(--background)]/30 mb-8 transition-colors duration-500">
                  {value.id}
                </span>
                <h3 className="text-3xl lg:text-4xl font-heading font-black uppercase tracking-tighter text-[var(--foreground)] group-hover:text-[var(--background)] mb-6 transition-colors duration-500">
                  {value.title}
                </h3>
                <p className="text-lg text-[var(--foreground)]/70 group-hover:text-[var(--background)]/80 transition-colors duration-500">
                  {value.desc}
                </p>

                {/* Animated Brutalist Accent Line */}
                <div className="absolute bottom-0 left-0 h-2 w-0 bg-[var(--color-brand-orange)] group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Continuous Marquee Transition */}
      <section className="py-24 overflow-hidden bg-[var(--color-brand-orange)] flex items-center">
        <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <h2 key={i} className="text-6xl md:text-[8vw] font-heading font-black uppercase tracking-tighter text-black px-8">
              ARCHITECTS — ENGINEERS — DESIGNERS — 
            </h2>
          ))}
        </div>
      </section>

    </main>
  );
}
