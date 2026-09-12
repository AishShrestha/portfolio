'use client';

import { motion } from 'framer-motion';

/**
 * Animated aurora background — large blurred gradient blobs that drift slowly.
 * Provides the premium "alive" feeling behind content.
 */
export function AuroraBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Purple blob */}
      <motion.div
        className="aurora-blob"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          width: 600,
          height: 600,
          top: '-10%',
          left: '-5%',
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blue blob */}
      <motion.div
        className="aurora-blob"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          width: 500,
          height: 500,
          top: '20%',
          right: '-5%',
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Cyan blob */}
      <motion.div
        className="aurora-blob"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          width: 450,
          height: 450,
          bottom: '-10%',
          left: '30%',
          opacity: 0.35,
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}