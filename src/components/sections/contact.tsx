'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Send, Check, Loader2 } from 'lucide-react';
import { Reveal, WordReveal } from '@/components/ui/reveal';
import { socials, siteConfig } from '@/lib/site';

type Status = 'idle' | 'loading' | 'success';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1400));
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-40">
      <div className="container-px relative z-10">
        <Reveal className="mb-12 flex items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-purple before:block before:h-px before:w-6 before:bg-accent-purple/60">
            Contact
          </span>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — heading + socials */}
          <div>
            <h3 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              <WordReveal text="Let's build" />
              <br />
              <span className="text-gradient">
                <WordReveal text="something intelligent." delay={0.2} />
              </span>
            </h3>

            <Reveal delay={0.3}>
              <p className="mb-10 max-w-md text-base leading-relaxed text-ink/55">
                I&apos;m open to AI engineering roles, freelance projects, and collaborations.
                Whether you have a fully-scoped project or just an idea, I&apos;d love to hear
                from you.
              </p>
            </Reveal>

            <Reveal delay={0.4} className="mb-10">
              <a
                href={socials.email}
                className="inline-flex items-center gap-3 rounded-full border border-line/10 bg-surface px-5 py-3 text-sm text-ink transition-colors hover:border-accent-purple/30"
              >
                <Mail className="h-4 w-4 text-accent-purple" />
                {socials.email.replace('mailto:', '')}
              </a>
            </Reveal>

            <Reveal delay={0.5}>
              <p className="mb-4 text-xs uppercase tracking-wider text-ink/40">Find me on</p>
              <div className="flex gap-3">
                <SocialLink href={socials.github} icon={<Github className="h-5 w-5" />} label="GitHub" />
                <SocialLink href={socials.linkedin} icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.3}>
            <form onSubmit={handleSubmit} className="glass relative overflow-hidden rounded-3xl p-8">
              <div className="relative space-y-5">
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="input-glass"
                  />
                </Field>

                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="input-glass"
                  />
                </Field>

                <Field label="Message" htmlFor="message">
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project…"
                    className="input-glass resize-none"
                  />
                </Field>

                <motion.button
                  type="submit"
                  disabled={status !== 'idle'}
                  whileTap={{ scale: 0.98 }}
                  className="btn-magnetic relative w-full overflow-hidden bg-accent-purple text-white hover:bg-accent-purple/90 disabled:opacity-80"
                >
                  <AnimatePresence mode="wait">
                    {status === 'idle' && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Send message
                        <Send className="h-4 w-4" />
                      </motion.span>
                    )}
                    {status === 'loading' && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Sending…
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </motion.span>
                    )}
                    {status === 'success' && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Message sent!
                        <Check className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink/40"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-line/10 bg-surface text-ink/60 transition-colors hover:border-accent-purple/30 hover:text-ink"
    >
      {icon}
    </a>
  );
}