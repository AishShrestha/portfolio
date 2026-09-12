'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { CommandPalette } from '@/components/ui/command-palette';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-line/5 bg-bg/70 backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <nav className="container-px flex h-16 items-center justify-center">
          {/* Logo — minimal text */}
          {/* <a href="#hero" className="text-sm font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </a> */}

          {/* Desktop nav — clean, no numbers, no magnetic */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink/50 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          {/* <div className="flex items-center gap-3">
            <button
              onClick={() => setPaletteOpen(true)}
              className="focus-glow hidden items-center gap-2 rounded-full border border-line/10 bg-surface px-3 py-1.5 text-xs text-ink/50 transition-colors hover:text-ink sm:flex"
              aria-label="Open command palette"
            >
              <Command className="h-3 w-3" />
              <kbd className="text-[10px]">⌘K</kbd>
            </button>

            <button
              className="focus-glow rounded-full border border-line/10 bg-surface p-2 text-ink/70 md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div> */}
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-b border-line/5 bg-bg/90 backdrop-blur-xl md:hidden"
            >
              <div className="container-px flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm text-ink/70 transition-colors hover:bg-surface/5 hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}