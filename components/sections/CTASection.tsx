"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceOptions = ["Web Platform", "WebGL / 3D", "Brand Identity", "E-Commerce"];

export default function CTASection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <section id="cta-form" className="py-32 px-6 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-7xl font-heading font-bold text-[var(--foreground)] mb-8">
          Ready to <span className="text-[var(--color-brand-orange)]">Upgrade?</span>
        </h2>
        <p className="text-xl text-[var(--foreground)]/70 mb-12 max-w-2xl">
          Stop losing clients to poor digital experiences. Let's engineer a platform that works for you.
        </p>
        
        <button
          onClick={toggleForm}
          className={cn(
            "group relative px-10 py-5 bg-[var(--foreground)] text-[var(--background)] font-bold uppercase tracking-widest overflow-hidden transition-colors rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)]",
            isOpen && "bg-[var(--color-brand-orange)] text-white"
          )}
        >
          <div className="absolute inset-0 bg-[var(--color-brand-orange)] transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
          <span className="relative z-10 grid items-center justify-items-center overflow-hidden">
            <span 
              className={cn(
                "col-start-1 row-start-1 flex items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]",
                isOpen ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
              )}
            >
              Start a Project <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
            <span 
              className={cn(
                "col-start-1 row-start-1 flex items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]",
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
              )}
            >
              Close Form
            </span>
          </span>
        </button>

        <div 
          className={cn(
            "w-full grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] mt-16 text-left",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            {/* Premium Inverted Agency Form */}
            <div className="bg-black text-white p-8 md:p-16 border border-black/10 rounded-[40px] shadow-2xl">
              <h3 className="text-3xl md:text-5xl font-heading font-black mb-10 tracking-tighter uppercase">
                Initiate<span className="text-[var(--color-brand-orange)] animate-pulse">_</span>
              </h3>
              
              <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
                
                {/* Interactive Service Selector */}
                <div className="space-y-4">
                  <p className="text-white/50 text-sm font-bold uppercase tracking-widest">I am looking for...</p>
                  <div className="flex flex-wrap gap-3">
                    {serviceOptions.map(service => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={cn(
                            "px-6 py-3 rounded-full border transition-all duration-300 font-bold text-sm tracking-wide flex items-center gap-2",
                            isSelected 
                              ? "border-[var(--color-brand-orange)] bg-[var(--color-brand-orange)] text-white" 
                              : "border-white/20 hover:border-white/60 text-white/70 hover:text-white"
                          )}
                        >
                          {isSelected && <Check className="w-4 h-4" />}
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Minimalist Brutalist Inputs */}
                <div className="flex flex-col md:flex-row gap-10">
                  <input 
                    type="text" 
                    placeholder="YOUR NAME" 
                    maxLength={50}
                    className="flex-1 bg-transparent border-b-2 border-white/20 py-4 text-xl font-bold placeholder-white/30 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors rounded-none"
                  />
                  <input 
                    type="email" 
                    placeholder="EMAIL ADDRESS" 
                    maxLength={100}
                    className="flex-1 bg-transparent border-b-2 border-white/20 py-4 text-xl font-bold placeholder-white/30 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors rounded-none"
                  />
                </div>
                
                <textarea 
                  placeholder="PROJECT DETAILS" 
                  rows={3}
                  maxLength={500}
                  className="w-full bg-transparent border-b-2 border-white/20 py-4 text-xl font-bold placeholder-white/30 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors rounded-none resize-none"
                ></textarea>
                
                <button 
                  className="mt-8 group w-full flex items-center justify-center gap-3 bg-white text-black font-heading font-black uppercase tracking-widest py-6 rounded-full hover:bg-[var(--color-brand-orange)] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(255,69,0,0.3)] hover:scale-[1.02]"
                >
                  Send Inquiry <Send className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
