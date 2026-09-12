'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, WordReveal } from '@/components/ui/reveal';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <div className="container-px relative z-10">
        <Reveal className="mb-12">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-purple before:block before:h-px before:w-6 before:bg-accent-purple/60">
            About
          </span>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Bio */}
          <div className="lg:col-span-7">
            <h3 className="mb-8 font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              <WordReveal text="Backend engineering is" />
              <br />
              <span className="italic font-normal text-accent-purple">
                <WordReveal text="my foundation." delay={0.2} />
              </span>
            </h3>

            <Reveal delay={0.2} className="space-y-5 text-base leading-relaxed text-ink/60 sm:text-lg">
              <p>
                I&apos;ve spent the last five years at Ekbana designing APIs, owning
                database schemas, and shipping systems that handle real traffic. Clean
                architecture and type safety aren&apos;t buzzwords for me — they&apos;re
                the baseline.
              </p>
              <p>
                <strong className="font-semibold text-ink">Now I build agentic AI.</strong>{' '}
                Not prompt wrappers — actual agent loops, hand-rolled: streaming,
                tool-calling, RAG, and reasoning traces you can watch. The copilot on this
                site is one of them.
              </p>
              <p>
                I care about the unglamorous details that make systems reliable: error
                handling, observability, and honest failure modes. I bring the same
                rigor to agents.
              </p>
            </Reveal>
          </div>

          {/* Facts — quiet, editorial, no card grid */}
          <motion.div style={{ y }} className="lg:col-span-5">
            <Reveal delay={0.3}>
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-ink/40">
                Currently
              </p>
              <ul className="space-y-5 text-sm leading-relaxed text-ink/70">
                <li>
                  <span className="font-semibold text-ink">Backend Engineer & Agentic AI Dev</span>
                  <br />
                  <span className="text-ink/50">Ekbana · Kathmandu · 2024 — present</span>
                </li>
                <li>
                  <span className="font-semibold text-ink">Learning in public</span>
                  <br />
                  <span className="text-ink/50">
                    Building agents from scratch to understand them deeply — no frameworks,
                    no shortcuts.
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-ink">Stack of choice</span>
                  <br />
                  <span className="text-ink/50">NestJS · PostgreSQL · TypeScript · Ollama</span>
                </li>
              </ul>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}