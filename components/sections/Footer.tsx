import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="pt-12 pb-28 lg:pb-12 px-6 border-t border-black/5 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/">
            <Image 
              src="/projects/logo.png" 
              alt="Hack Arena" 
              width={200} 
              height={50} 
              unoptimized={true}
              className="h-8 md:h-10 w-auto object-contain mb-4 opacity-90 hover:opacity-100 transition-opacity" 
            />
          </Link>
          <p className="text-[var(--foreground)]/50 text-sm">
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
