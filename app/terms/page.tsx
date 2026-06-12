import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the terms of service and conditions for using HackArena's website and digital services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 px-6 pb-20 flex flex-col items-center bg-[var(--background)]">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-[var(--foreground)] mb-10">
          Terms of Service
        </h1>
        <div className="bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 text-[var(--foreground)]/80 leading-relaxed">
          <p className="mb-6">
            <strong>Last Updated: June 2026</strong>
          </p>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By accessing and using Hack Arena's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
          </p>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">2. Intellectual Property</h2>
          <p className="mb-6">
            All designs, code, WebGL shaders, and assets created by Hack Arena remain our intellectual property until full payment is received and specific transfer agreements are executed.
          </p>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">3. Limitation of Liability</h2>
          <p className="mb-6">
            Hack Arena shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services or any web platforms we deploy.
          </p>
          <p>
            For legal inquiries, please contact legal@hackarena.dev.
          </p>
        </div>
      </div>
    </main>
  );
}
