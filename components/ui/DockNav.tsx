"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Home, Info, Folder, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About Us", href: "/about-us", icon: Info },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Teams", href: "/teams", icon: Users },
];

export default function DockNav() {
  const dockRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Initial check on mount
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The dock is visually collapsed only when the page is scrolled past 50px AND the user is not actively hovering it.
  // This decoupling prevents trackpad inertia scroll events from fighting the mouse hover state.
  const collapsed = isScrolled && !isHovered;

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 p-4" // Generous invisible hitbox to prevent edge-hover flicker
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav
        ref={dockRef}
        className={cn(
          "glass-panel flex items-center justify-center rounded-full p-1 md:p-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          collapsed ? "gap-1 md:gap-2 scale-100" : "gap-0.5 sm:gap-1 md:gap-4 scale-100"
        )}
      >
        {/* Brand Logo inside Dock */}
        <Link href="/" className="relative flex items-center justify-center shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ml-1.5 sm:ml-2 md:ml-3 mr-0.5 sm:mr-1 md:mr-2 transition-all duration-500">
          <Image 
            src="/projects/logo.png" 
            alt="HackArena" 
            fill 
            sizes="32px"
            unoptimized={true}
            className="object-contain"
          />
        </Link>
        <div className="w-[1px] h-5 sm:h-6 md:h-8 bg-black/10 mr-0.5 md:mr-2 shrink-0 transition-all duration-500" /> {/* Divider */}

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                collapsed ? "h-8 px-2 sm:h-9 sm:px-3 md:h-12 md:px-4" : "h-8 px-1.5 sm:h-9 sm:px-2.5 md:h-12 md:px-5",
                isActive
                  ? "bg-[var(--color-brand-orange)] text-white"
                  : "text-black/70 hover:bg-black/10 hover:text-black"
              )}
            >
              <item.icon
                className={cn(
                  "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0",
                  collapsed ? "h-4 w-4 md:h-6 md:w-6" : "h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
                )}
              />
              <span
                className={cn(
                  "font-medium text-[9px] sm:text-[10px] md:text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap mt-0.5 md:mt-0",
                  collapsed ? "max-w-0 opacity-0 ml-0" : "max-w-[40px] sm:max-w-[45px] md:max-w-[100px] opacity-100 ml-1 sm:ml-1.5 md:ml-2"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
