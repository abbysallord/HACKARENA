import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read HackArena's privacy policy to understand how we collect, use, and protect your data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 px-6 pb-20 flex flex-col items-center bg-[var(--background)]">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-[var(--foreground)] mb-10">
          Privacy Policy
        </h1>
        <div className="bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 text-[var(--foreground)]/80 leading-relaxed">
          <p className="mb-6">
            <strong>Last Updated: June 2026</strong>
          </p>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-6">
            We collect information that you provide directly to us, such as when you submit a project inquiry, subscribe to our newsletter, or contact us for support. This may include your name, email address, and project details.
          </p>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">2. How We Use Information</h2>
          <p className="mb-6">
            We use the information we collect to deliver the services you request, communicate with you about your project, and improve our website's performance and analytics.
          </p>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">3. Data Security</h2>
          <p className="mb-6">
            We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@hackarena.dev.
          </p>
        </div>
      </div>
    </main>
  );
}
