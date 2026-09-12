'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { skillCategories } from '@/lib/skills';
import { Reveal, WordReveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

export function Skills() {
  const [active, setActive] = useState<string | null>('ai');

  return (
    <section id="skills" className="relative overflow-hidden py-32 md:py-40">
      <div className="container-px relative z-10">
        <Reveal className="mb-12 flex items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-purple before:block before:h-px before:w-6 before:bg-accent-purple/60">
            Skills
          </span>
        </Reveal>

        <h3 className="mb-14 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          <WordReveal text="The tools I use to" />{' '}
          <span className="text-gradient">
            <WordReveal text="build the future." delay={0.2} />
          </span>
        </h3>

        <div className="grid gap-4 lg:grid-cols-2">
          {skillCategories.map((cat, i) => {
            const isOpen = active === cat.id;
            return (
              <Reveal key={cat.id} delay={i * 0.06}>
                <button
                  onClick={() => setActive(isOpen ? null : cat.id)}
                  className={cn(
                    'group w-full rounded-2xl border p-5 text-left transition-colors duration-300',
                    isOpen
                      ? 'border-accent-purple/25 bg-surface'
                      : 'border-line/10 bg-surface hover:border-accent-purple/30',
                  )}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <cat.icon className="h-4 w-4" style={{ color: cat.color }} />
                      <span className="text-sm font-medium text-ink">{cat.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-ink/40 transition-transform duration-300',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 pt-4">
                          {cat.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-line/8 px-3 py-1 text-xs text-ink/60"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}