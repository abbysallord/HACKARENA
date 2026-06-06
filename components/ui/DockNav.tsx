"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 p-4" // Generous invisible hitbox to prevent edge-hover flicker
      onMouseEnter={() => setScrolled(false)}
      onMouseLeave={() => setScrolled(window.scrollY > 50)}
    >
      <nav
        ref={dockRef}
        className={cn(
          "glass-panel flex items-center justify-center rounded-full p-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "gap-2 scale-90" : "gap-4 scale-100"
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                scrolled ? "h-10 px-3" : "h-12 px-5", // Pure padding interpolation, no fixed widths that snap to auto
                isActive
                  ? "bg-[var(--color-brand-orange)] text-white"
                  : "text-black/70 hover:bg-black/10 hover:text-black"
              )}
            >
              <item.icon
                className={cn(
                  "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0",
                  scrolled ? "h-5 w-5" : "h-4 w-4"
                )}
              />
              <span
                className={cn(
                  "font-medium text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap",
                  scrolled ? "max-w-0 opacity-0 ml-0" : "max-w-[100px] opacity-100 ml-2"
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
