'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { WordReveal, CharReveal, Reveal } from '@/components/ui/reveal';
import { siteConfig } from '@/lib/site';

/** Soft fixed gradient wash behind everything — barely-there teal. */
function BackgroundWash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(42,111,111,0.05), transparent 50%),' +
          'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(120,160,140,0.05), transparent 50%),' +
          'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(42,111,111,0.04), transparent 50%)',
      }}
    />
  );
}

/** A few thin-stroke geometric shapes drifting slowly — quiet, not busy. */
function FloatingShapes() {
  const shapes = [
    { top: '15%', right: '10%', size: 44, dur: 16, svg: <circle cx="21" cy="21" r="19" /> },
    { top: '40%', left: '7%', size: 26, dur: 12, svg: <path d="M13 2L24 13L13 24L2 13Z" /> },
    { bottom: '30%', right: '14%', size: 60, dur: 20, svg: <rect x="8" y="8" width="44" height="44" rx="4" strokeDasharray="4 4" /> },
    { top: '60%', left: '10%', size: 34, dur: 14, svg: <path d="M17 4L30 30H4Z" /> },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: s.top, left: s.left, right: s.right, width: s.size, height: s.size }}
          animate={{ y: [0, -18, 0], rotate: [0, i % 2 ? 90 : -60, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 44 44"
            fill="none"
            stroke="rgba(42,111,111,0.14)"
            strokeWidth="1.4"
            className="h-full w-full"
          >
            {s.svg}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/** Soft teal light following the cursor — same lerp feel as the original minimal design. */
function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, active = false;

    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!active) { active = true; el.style.opacity = '1'; }
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-500"
      style={{ background: 'radial-gradient(circle, rgba(42,111,111,0.06), transparent 60%)' }}
    />
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <BackgroundWash />
      <FloatingShapes />
      <MouseGlow />

      <motion.div
        style={{ y, opacity }}
        className="container-px relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 font-mono text-xs tracking-widest text-ink/40"
        >
          <span className="mr-2 inline-block h-2 w-2 animate-blink rounded-full bg-accent-purple align-middle" />
          Backend Engineer → Agentic AI
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 font-display text-3xl font-medium tracking-[0.02em] text-ink/90 sm:text-4xl"
        >
          <CharReveal text={siteConfig.name} stagger={0.04} delay={0.5} />
        </motion.h1>

        {/* Headline */}
        <h2 className="mb-7 max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
          <WordReveal text="Building systems that" delay={0.9} stagger={0.07} />
          <br />
          <span className="italic font-normal">
            <WordReveal text="think for themselves." delay={1.35} stagger={0.07} />
          </span>
        </h2>

        {/* Supporting paragraph */}
        <Reveal delay={1.7} className="mb-12 max-w-[560px]">
          <p className="text-base leading-relaxed text-ink/55 sm:text-lg">
            I&apos;m Ayush — a backend engineer building agentic AI systems. I hand-roll agent
            loops, design robust APIs, and care about the details that make AI actually useful.
          </p>
        </Reveal>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2 }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="btn-magnetic bg-accent-purple text-white hover:bg-accent-purple/90"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          <a
            href="#contact"
            className="btn-magnetic border border-line/15 bg-surface/60 text-ink hover:bg-surface"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </a>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.3 }}
          className="mt-14 font-mono text-xs text-ink/30"
        >
          {siteConfig.location} · working remotely
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/30">scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-accent-purple/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}