'use client';

import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

/**
 * Smooth scroll setup using Lenis.
 *
 * Key fixes for reliable scrolling:
 *  - Avoid overflow-x:hidden on body (use overflow-x:clip on html instead)
 *    so Lenis can drive window scrolling without a competing scroll container.
 *  - Do NOT set CSS scroll-behavior:smooth — Lenis handles smoothing;
 *    combining the two causes janky/locked scroll behavior.
 *  - Properly cancel the rAF loop + destroy Lenis on unmount.
 *  - Route in-page anchor (#section) clicks through lenis.scrollTo().
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let rafId = 0;
    let lenis: Lenis | null = null;

    (async () => {
      const LenisCtor = (await import('lenis')).default;
      lenis = new LenisCtor({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
        // Prevent iOS rubber-band fighting; let Lenis own the scroll.
        prevent: (node) => {
          // Don't smooth-scroll inside scrollable sub-containers (e.g. terminal)
          return node.closest('[data-lenis-prevent]') !== null;
        },
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Route anchor link clicks through Lenis for consistent smooth jumps.
      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -64 }); // offset for fixed navbar
      };
      document.addEventListener('click', onClick);
      (window as any).__lenis = lenis;

      return () => {
        document.removeEventListener('click', onClick);
        cancelAnimationFrame(rafId);
        lenis?.destroy();
        lenisRef.current = null;
        delete (window as any).__lenis;
      };
    })();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}