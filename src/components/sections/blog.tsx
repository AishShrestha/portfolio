'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, PenLine } from 'lucide-react';
import { Reveal, WordReveal } from '@/components/ui/reveal';

const COMING_SOON = [
  { title: 'Building Multi-Agent Systems with LangChain', tag: 'AI Agents', status: 'Drafting' },
  { title: 'RAG in Production: Chunking, Reranking & Citations', tag: 'RAG', status: 'Drafting' },
  { title: 'Running Local LLMs with Ollama for Private AI', tag: 'Local AI', status: 'Planning' },
  { title: 'Designing Backend Architecture for AI Apps', tag: 'Backend', status: 'Planning' },
];

export function Blog() {
  return (
    <section id="blog" className="relative overflow-hidden py-32 md:py-40">
      <div className="container-px relative z-10">
        <Reveal className="mb-12 flex items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-purple before:block before:h-px before:w-6 before:bg-accent-purple/60">
            Writing
          </span>
        </Reveal>

        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h3 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            <WordReveal text="Writing about" />{' '}
            <span className="text-gradient">
              <WordReveal text="AI & engineering." delay={0.2} />
            </span>
          </h3>
          <Reveal delay={0.3}>
            <p className="max-w-xs text-sm text-ink/40">
              Deep dives into the AI systems I build and lessons learned.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {COMING_SOON.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group rounded-2xl border border-line/8 bg-surface p-6 transition-colors hover:border-accent-purple/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-accent-purple/10 px-3 py-0.5 text-xs font-medium text-accent-purple">
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-ink/30">
                    <PenLine className="h-3 w-3" />
                    {post.status}
                  </span>
                </div>

                <h4 className="mb-4 text-base font-medium leading-snug text-ink/80 transition-colors group-hover:text-ink">
                  {post.title}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-ink/30 transition-colors group-hover:text-accent-purple">
                  Coming soon
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}