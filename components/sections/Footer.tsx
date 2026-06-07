import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-12 pb-28 lg:pb-12 px-6 border-t border-black/5 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-heading font-bold text-[var(--foreground)] tracking-widest uppercase">
            Hack Arena
          </h2>
          <p className="text-[var(--foreground)]/50 text-sm mt-2">
            © {new Date().getFullYear()} Hack Arena. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <Link href="/privacy" className="text-sm text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors">
            Terms of Service
          </Link>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sm text-[var(--color-brand-orange)] hover:text-[var(--foreground)] transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
