'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/lib/projects';
import { Reveal, WordReveal } from '@/components/ui/reveal';

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-32 md:py-40">
      <div className="bg-grid absolute inset-0 opacity-15" />

      <div className="container-px relative z-10">
        <Reveal className="mb-12 flex items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-purple before:block before:h-px before:w-6 before:bg-accent-purple/60">
            Projects
          </span>
        </Reveal>

        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h3 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            <WordReveal text="Selected work in" />{' '}
            <span className="text-gradient">
              <WordReveal text="AI & systems." delay={0.2} />
            </span>
          </h3>
          <Reveal delay={0.3}>
            <p className="max-w-xs text-sm text-ink/40">
              Projects spanning AI agents, RAG, automation, and developer tools.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-line/8 bg-surface p-6 transition-colors hover:border-accent-purple/30"
    >
      <div className="mb-5 flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${project.accent}15`, color: project.accent }}
        >
          <project.icon className="h-5 w-5" />
        </div>
        {project.featured && (
          <span className="text-xs text-ink/30">Featured</span>
        )}
      </div>

      <h4 className="mb-2 text-xl font-semibold tracking-tight text-ink">
        {project.title}
      </h4>
      <p className="mb-3 text-sm" style={{ color: project.accent }}>
        {project.tagline}
      </p>
      <p className="mb-5 text-sm leading-relaxed text-ink/50">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-line/8 px-2 py-0.5 text-xs text-ink/50"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="inline-flex items-center gap-1.5 text-xs text-ink/60 transition-colors hover:text-ink"
          >
            Live Demo
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className="inline-flex items-center gap-1.5 text-xs text-ink/60 transition-colors hover:text-ink"
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
        )}
      </div>
    </motion.article>
  );
}