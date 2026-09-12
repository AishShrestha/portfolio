'use client';

/**
 * Floating Copilot widget — the entry point.
 * Sits bottom-right; opens a chat panel with the live agent trace.
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import { CopilotPanel } from './copilot-panel';
import type { ChatMessage } from '@/lib/copilot';

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    "Hey! I'm Ayush's Portfolio Copilot — a hand-rolled agent (no frameworks) with live tool-calling. " +
    'Ask me about his projects, experience, or stack — and watch the trace as I work.',
};

export function CopilotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [sessionId] = useState(
    () => `web-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`,
  );
  const [teaser, setTeaser] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setTeaser(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="copilot" className="fixed bottom-5 right-5 z-50 select-none">
      <AnimatePresence>
        {open && (
          <motion.div
            id="copilot-panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 flex h-[560px] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-line/15 bg-bg/90 shadow-glass backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-purple opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-purple" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Portfolio Copilot</p>
                  <p className="text-[10px] font-mono text-ink/40">agent · tools · sse · rag</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-ink/40 transition-colors hover:bg-bg-100 hover:text-ink"
                aria-label="Close copilot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <CopilotPanel messages={messages} setMessages={setMessages} sessionId={sessionId} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-accent-purple/30 bg-surface/80 text-accent-purple shadow-glass backdrop-blur-xl"
        aria-label={open ? 'Close Portfolio Copilot' : 'Open Portfolio Copilot'}
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        <span className="absolute inset-0 rounded-full bg-accent-purple/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </motion.button>

      {/* Teaser badge */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            className="pointer-events-none absolute bottom-3 right-14 whitespace-nowrap rounded-full border border-line/15 bg-bg/90 px-3 py-1.5 text-[11px] text-ink/70 shadow-glass backdrop-blur-xl"
          >
            Ask my AI copilot ✨
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}