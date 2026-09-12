'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiences } from '@/lib/experience';
import { Reveal, WordReveal } from '@/components/ui/reveal';

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" ref={ref} className="relative overflow-hidden py-32 md:py-40">
      <div className="container-px relative z-10">
        <Reveal className="mb-12 flex items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-purple before:block before:h-px before:w-6 before:bg-accent-purple/60">
            Experience
          </span>
        </Reveal>

        <h3 className="mb-16 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          <WordReveal text="My journey so far." />
        </h3>

        <div className="relative mx-auto max-w-2xl">
          {/* Track */}
          <div className="absolute left-3 top-0 h-full w-px bg-line/5" />
          <motion.div
            className="absolute left-3 top-0 h-full w-px origin-top bg-accent-purple/40"
            style={{ scaleY: lineScale }}
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div key={exp.id} className="relative pl-12">
                {/* Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-20%' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-3 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-purple ring-4 ring-bg"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15%' }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-accent-purple/10 px-3 py-0.5 text-xs font-medium text-accent-purple">
                      {exp.period}
                    </span>
                    <span className="text-xs text-ink/35">{exp.location}</span>
                  </div>

                  <h4 className="text-lg font-semibold text-ink">{exp.role}</h4>
                  <p className="mb-3 text-sm text-accent-blue/70">{exp.company}</p>
                  <p className="mb-4 text-sm leading-relaxed text-ink/50">{exp.description}</p>

                  <ul className="mb-4 space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink/55">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line/8 px-2 py-0.5 text-xs text-ink/45"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}