'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useScrollProgress } from '@/hooks/use-scroll-progress';

/**
 * Thin gradient scroll progress bar fixed to the top of the viewport.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: progress / 100,
        background:
          'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)',
      }}
      aria-hidden
    />
  );
}