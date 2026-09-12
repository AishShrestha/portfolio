'use client';

import { Heart } from 'lucide-react';
import { siteConfig, socials, navLinks } from '@/lib/site';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/5 py-14">
      <div className="bg-grid absolute inset-0 opacity-15" />

      <div className="container-px relative z-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <a href="#hero" className="text-sm font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink/50 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            <a href={socials.github} className="text-sm text-ink/40 transition-colors hover:text-ink" aria-label="GitHub">GitHub</a>
            <a href={socials.linkedin} className="text-sm text-ink/40 transition-colors hover:text-ink" aria-label="LinkedIn">LinkedIn</a>
            <a href={socials.email} className="text-sm text-ink/40 transition-colors hover:text-ink" aria-label="Email">Email</a>
          </div>

          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-line/10 to-transparent" />

          <p className="flex items-center gap-1.5 text-xs text-ink/30">
            © {new Date().getFullYear()} {siteConfig.name}. Built with
            <Heart className="h-3 w-3 fill-accent-purple/60 text-accent-purple/60" />
            in {siteConfig.location}.
          </p>
        </div>
      </div>
    </footer>
  );
}