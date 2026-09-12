'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook to track the mouse position in normalized coordinates.
 * Returns a ref to attach to the container element.
 */
export function useMousePosition() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--cursor-x', `${x}%`);
      el.style.setProperty('--cursor-y', `${y}%`);
    };

    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  return ref;
}