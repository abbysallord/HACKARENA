"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const techString = "REACT • NEXT.JS • WEBGL • THREE.JS • AWS • DOCKER • POSTGRESQL • ";

export default function TechStack() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    // Row 1 goes left
    gsap.to(row1Ref.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    // Row 2 goes right
    gsap.fromTo(row2Ref.current, {
      xPercent: -50,
    }, {
      xPercent: 0,
      ease: "none",
      duration: 25,
      repeat: -1,
    });
  }, []);

  return (
    <section className="py-20 overflow-hidden bg-[var(--background)]">
      <div className="relative flex flex-col select-none">
        {/* Row 1 */}
        <div className="flex w-max" ref={row1Ref}>
          <div className="flex whitespace-nowrap">
            <h2 className="text-[12vw] font-heading font-black tracking-tighter text-[var(--foreground)] opacity-10">
              {techString}{techString}
            </h2>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex w-max -mt-[4vw]" ref={row2Ref}>
          <div className="flex whitespace-nowrap">
            <h2 className="text-[12vw] font-heading font-black tracking-tighter text-[var(--foreground)]">
              {techString}{techString}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
