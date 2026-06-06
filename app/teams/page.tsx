"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { id: "01", name: "Dhanush Shenoy H", role: "Lead WebGL Engineer", image: "/projects/1.jpg" },
  { id: "02", name: "Anand M", role: "Creative Director", image: "/projects/2.jpg" },
  { id: "03", name: "Dinesh A", role: "Performance Architect", image: "/projects/3.jpg" }
];

export default function TeamsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Animation
      gsap.fromTo(heroTextRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.1 }
      );

      // 2. Roster List Stagger
      if (listRef.current) {
        const rows = listRef.current.querySelectorAll('.team-row');
        gsap.fromTo(rows,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden pb-32">
      
      {/* Hero Section */}
      <section className="pt-40 md:pt-56 pb-20 px-6 md:px-12">
        <div className="overflow-hidden pb-4 md:pb-8 px-4 -mx-4">
          <h1 ref={heroTextRef} className="text-6xl md:text-[10vw] font-heading font-black uppercase tracking-tighter leading-[0.85] text-[var(--foreground)]">
            THE ARCHITECTS.
          </h1>
        </div>
        <p className="mt-8 text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm md:text-base">
          Engineers of your digital reality —&gt;
        </p>
      </section>

      {/* Interactive Roster */}
      <section className="px-6 md:px-12 mt-12">
        <div className="max-w-[1400px] mx-auto border-b border-[var(--foreground)]/20" ref={listRef}>
          {team.map((member) => (
            <div 
              key={member.id}
              className="team-row group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-t border-[var(--foreground)]/20 hover:bg-[var(--color-brand-orange)] transition-colors duration-500 cursor-pointer px-6 md:px-12 -mx-6 md:-mx-12"
            >
              {/* ID & Name Section */}
              <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto">
                <span className="text-lg md:text-2xl font-bold tracking-widest text-[var(--foreground)]/30 group-hover:text-black/30 transition-colors duration-500">
                  {member.id}
                </span>
                
                {/* Expanding Image on Hover (Desktop Only) */}
                <div className="hidden md:block w-0 overflow-hidden group-hover:w-[200px] lg:group-hover:w-[300px] h-[80px] lg:h-[100px] relative transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover object-center scale-150 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] grayscale group-hover:grayscale-0"
                  />
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tighter text-[var(--foreground)] group-hover:text-black transition-colors duration-500 whitespace-nowrap">
                  {member.name}
                </h2>
              </div>

              {/* Role */}
              <div className="mt-6 md:mt-0 w-full md:w-auto text-left md:text-right">
                <span className="block text-xl md:text-2xl font-medium text-[var(--foreground)]/50 group-hover:text-black/80 transition-colors duration-500">
                  {member.role}
                </span>
              </div>
              
              {/* Mobile Static Image (Visible only on small screens) */}
              <div className="block md:hidden w-full h-[200px] relative mt-8 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover object-center"
                />
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
