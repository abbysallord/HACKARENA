"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { 
    title: "NEON ENGINE", 
    industry: "FINTECH PLATFORM",
    client: "NEXUS CORP",
    src: "/projects/1.jpg" 
  },
  { 
    title: "AURA CHROME", 
    industry: "WEBGL E-COMMERCE",
    client: "AURA STUDIOS",
    src: "/projects/2.jpg" 
  },
  { 
    title: "VELOCITY IRON", 
    industry: "ENTERPRISE SAAS",
    client: "VELOCITY INC",
    src: "/projects/3.jpg" 
  },
  { 
    title: "VIRTUAL HORIZON", 
    industry: "AI RESEARCH",
    client: "HORIZON LABS",
    src: "/projects/1.jpg" 
  },
  { 
    title: "PROJECT ZERO", 
    industry: "DIGITAL IDENTITY",
    client: "ZERO TRUST",
    src: "/projects/2.jpg" 
  }
];

export default function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Initial page load animation
    const ctx = gsap.context(() => {
      gsap.from(".project-row", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });
      
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[var(--background)] pt-32 pb-48 px-4 md:px-12 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div className="mb-16 md:mb-24">
          <h1 ref={textRef} className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase text-[var(--foreground)]">
            INDEX OF WORKS.
          </h1>
          <div className="w-full h-px bg-black/10 mt-8" />
        </div>

        <div className="flex flex-col w-full relative">
          {projects.map((project, i) => {
            const isActive = hoveredIndex === i;
            
            return (
              <div 
                key={i}
                className={`project-row group border-b border-black/10 flex flex-col justify-center cursor-pointer relative transition-[padding] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'z-50 py-32 md:py-48' : 'z-10 py-6 md:py-10'}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 
                  Text Row 
                  We toggle the text color explicitly with React state instead of buggy mix-blend modes.
                */}
                <div className={`w-full px-4 md:px-8 flex items-center justify-between z-20 relative pointer-events-none transition-colors duration-500 ease-out ${isActive ? 'text-white' : 'text-black'}`}>
                  <div className="flex flex-col transition-transform duration-500 ease-out group-hover:translate-x-2 md:group-hover:translate-x-8">
                     <span className={`text-[10px] md:text-xs font-bold tracking-widest mb-1 md:mb-2 transition-colors duration-500 ${isActive ? 'text-white/70' : 'text-black/60'}`}>
                       0{i + 1}
                     </span>
                     <h2 className="text-4xl sm:text-6xl md:text-[7vw] font-heading font-black uppercase tracking-tighter leading-[0.8]">
                       {project.title}
                     </h2>
                  </div>
                  
                  <div className="hidden md:flex flex-col items-end text-right mt-auto">
                    <span className="text-sm lg:text-base font-bold tracking-widest">{project.client}</span>
                    <span className={`text-[10px] lg:text-xs uppercase tracking-widest mt-1 transition-colors duration-500 ${isActive ? 'text-white/70' : 'text-black/60'}`}>{project.industry}</span>
                  </div>
                  
                  <div className="md:hidden flex items-end h-full">
                    <ArrowUpRight className={`w-8 h-8 transition-colors duration-500 ${isActive ? 'text-white' : 'text-black/50'}`} />
                  </div>
                </div>

                {/* Expanding Image Accordion (Absolute Center of Row) */}
                <div 
                  className={`absolute left-0 right-0 w-full overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 pointer-events-none shadow-2xl
                    ${isActive ? 'h-[250px] md:h-[400px] top-1/2 -translate-y-1/2 opacity-100 scale-100' : 'h-[50px] top-1/2 -translate-y-1/2 opacity-0 scale-95'}`}
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src={project.src}
                      alt={project.title}
                      fill
                      unoptimized={true}
                      quality={100}
                      className={`object-cover object-center transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] 
                        ${isActive ? 'scale-100 grayscale-0' : 'scale-125 grayscale'}`}
                    />
                    {/* Brutalist Vignette Overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
      
    </main>
  );
}
