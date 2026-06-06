"use client";

import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { gsap } from "gsap";

const faqs = [
  {
    q: "Do WebGL sites perform poorly on mobile?",
    a: "We implement strict graceful degradation. On high-end devices, you get the full WebGL experience at 60fps. On low-end or battery-saving devices, we seamlessly fall back to lightweight CSS 3D transforms or baked videos, ensuring zero jitter."
  },
  {
    q: "How long does a typical project take?",
    a: "Most landing pages take 2-4 weeks from concept to deployment. Full platform designs take 6-12 weeks depending on complexity."
  },
  {
    q: "Do you use templates?",
    a: "No. Everything we build is a bespoke digital experience tailored to your brand's specific needs and aesthetic."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-[var(--foreground)] mb-12 text-center">
          Common Questions
        </h2>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className="border-b border-black/10 pb-4 overflow-hidden"
              >
                <button 
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between text-left py-4 hover:text-[var(--color-brand-orange)] transition-colors"
                >
                  <span className="text-xl font-medium text-[var(--foreground)]">{faq.q}</span>
                  <div className="text-[var(--color-brand-orange)] ml-4 shrink-0">
                    {isOpen ? <Minus /> : <Plus />}
                  </div>
                </button>
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[var(--foreground)]/70 pb-4 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
