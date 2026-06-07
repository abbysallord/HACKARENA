"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { id: "01", name: "Dhanush Shenoy\u00A0H", role: "Lead WebGL Engineer", image: "/projects/Dhanush_Shenoy_H.jpeg", link: "https://www.dshenoyh.in" },
  { id: "02", name: "Anand M", role: "Creative Director", image: "/projects/anand.jpeg", link: "https://www.anandmahadev.in" },
  { id: "03", name: "Dinesh A", role: "Performance Architect", image: "/projects/dinesh.jpeg", link: "https://dinesha.tech/" }
];

export default function TeamsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

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
          <h1 ref={heroTextRef} className="text-5xl md:text-[10vw] font-heading font-black uppercase tracking-tighter leading-[0.85] text-[var(--foreground)]">
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
            <a 
              key={member.id}
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                // On touch devices, tap once to highlight, tap again to visit link
                if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
                  if (activeId !== member.id) {
                    e.preventDefault();
                    setActiveId(member.id);
                  }
                }
              }}
              data-active={activeId === member.id}
              className="team-row group block relative flex flex-col lg:flex-row items-start lg:items-center justify-between py-10 md:py-16 border-t border-[var(--foreground)]/20 hover:bg-[var(--color-brand-orange)] data-[active=true]:bg-[var(--color-brand-orange)] transition-colors duration-500 cursor-pointer px-6 md:px-12 -mx-6 md:-mx-12"
            >
              {/* ID & Name Section */}
              <div className="flex items-start lg:items-center gap-4 lg:gap-8 xl:gap-12 w-full lg:w-auto">
                <span className="text-lg md:text-2xl lg:text-xl xl:text-2xl font-bold tracking-widest text-[var(--foreground)]/30 group-hover:text-black group-data-[active=true]:text-black transition-colors duration-500 mt-1 lg:mt-0 shrink-0">
                  {member.id}
                </span>
                
                {/* Expanding Image on Hover (Desktop Only) */}
                <div className="hidden lg:block w-0 overflow-hidden group-hover:w-[120px] group-data-[active=true]:w-[120px] xl:group-hover:w-[150px] xl:group-data-[active=true]:w-[150px] 2xl:group-hover:w-[180px] 2xl:group-data-[active=true]:w-[180px] h-[120px] xl:h-[150px] 2xl:h-[180px] relative transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full shrink-0">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    quality={100}
                    sizes="(max-width: 1536px) 150px, 180px"
                    className="object-cover object-center scale-150 group-hover:scale-100 group-data-[active=true]:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] grayscale group-hover:grayscale-0 group-data-[active=true]:grayscale-0"
                  />
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-black uppercase tracking-tighter text-[var(--foreground)] group-hover:text-black group-data-[active=true]:text-black transition-colors duration-500 whitespace-normal lg:whitespace-nowrap break-words">
                  {member.name}
                </h2>
              </div>

              {/* Role */}
              <div className="mt-6 lg:mt-0 w-full lg:w-auto text-left lg:text-right shrink-0">
                <span className="block text-xl md:text-2xl lg:text-xl xl:text-2xl font-medium text-[var(--foreground)]/50 group-hover:text-black/80 group-data-[active=true]:text-black/80 transition-colors duration-500">
                  {member.role}
                </span>
              </div>
              
              {/* Mobile/Tablet Static Image */}
              <div className="block lg:hidden w-full h-[250px] md:h-[400px] relative mt-8 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 group-data-[active=true]:grayscale-0 transition-all duration-500">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
