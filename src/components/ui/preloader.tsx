'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Cinematic loading screen shown on first paint.
 * Features an animated logo + progress shimmer, then fades out.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo with pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-purple text-lg font-bold text-white">
                AS
              </div>
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-accent-purple"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Shimmer bar */}
            <div className="h-0.5 w-32 overflow-hidden rounded-full bg-surface/5">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-xs text-ink/30"
            >
              Initializing portfolio…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}