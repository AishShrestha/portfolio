'use client';

/**
 * Copilot panel content — chat + LIVE trace of the agent loop.
 * The trace (thinking → tool call → result → tokens → citations) is the demo:
 * visitors watch the agent reason in real time.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Search, Sparkles, Wrench, Zap, AlertTriangle, MessageSquare, User, ChevronDown } from 'lucide-react';
import { askCopilot, type ChatMessage, type TraceEvent } from '@/lib/copilot';

interface TraceItem {
  kind: 'thinking' | 'tool' | 'tool-done';
  iteration: number;
  name?: string;
  args?: unknown;
  result?: unknown;
  durationMs?: number;
  ok?: boolean;
}

const SUGGESTIONS = [
  'What has Ayush built with AI agents?',
  'Summarize his backend experience',
  'What stack does he use for RAG?',
  'Where did he study?',
];

function ToolTrace({ item }: { item: TraceItem }) {
  const [open, setOpen] = useState(false);
  const isTool = item.kind === 'tool';
  const isDone = item.kind === 'tool-done';

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className={`ml-1 flex items-start gap-2 text-[11px] leading-relaxed ${isTool ? 'text-accent-purple' : 'text-ink/40'}`}
    >
      {isTool ? (
        <Wrench className="mt-0.5 h-3 w-3 shrink-0 text-accent-purple" />
      ) : isDone ? (
        <ChevronDown className="mt-0.5 h-3 w-3 shrink-0 text-ink/30" />
      ) : (
        <Search className="mt-0.5 h-3 w-3 shrink-0 animate-pulse text-accent-purple" />
      )}

      {isTool && (
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-left font-mono text-accent-purple/90 hover:text-accent-purple"
          title="Show arguments"
        >
          {item.name}(<span className="text-ink/50">{JSON.stringify(item.args ?? {})}</span>)
        </button>
      )}
      {item.kind === 'thinking' && <span className="text-ink/50">thinking…</span>}
      {isDone && (
        <button onClick={() => setOpen((o) => !o)} className="text-left text-ink/40 hover:text-ink/70">
          {item.ok ? 'returned' : 'failed'} {item.durationMs}ms
          {Array.isArray(item.result) ? ` · ${item.result.length} items` : ''}
        </button>
      )}

      <AnimatePresence>
        {open && item.result != null && (
          <motion.pre
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 max-h-40 w-full overflow-auto rounded-lg border border-line/10 bg-bg-100 p-2 font-mono text-[10px] text-ink/50"
          >
            {JSON.stringify(item.result, null, 2).slice(0, 800)}
          </motion.pre>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Citation({ name }: { name: string }) {
  const href =
    name === 'get_projects'
      ? '#projects'
      : name === 'get_experience'
        ? '#experience'
        : name === 'get_skills'
          ? '#skills'
          : name === 'get_profile'
            ? '#about'
            : undefined;
  return (
    <a
      href={href ?? '#copilot'}
      className="inline-flex items-center gap-1 rounded-full border border-line/20 bg-bg-100 px-2 py-0.5 font-mono text-[10px] text-accent-purple/80 transition-colors hover:border-accent-purple/40 hover:text-accent-purple"
      title={`source: ${name}`}
    >
      <Zap className="h-2.5 w-2.5" />
      {name}
    </a>
  );
}

export function CopilotPanel({
  messages,
  setMessages,
  sessionId,
}: {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  sessionId: string;
}) {
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [liveTrace, setLiveTrace] = useState<TraceItem[]>([]);
  const [liveText, setLiveText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, liveTrace, liveText]);

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || busy) return;

      const history = messages.slice(-8).map((m) => ({ role: m.role, content: m.content }));
      setMessages((m) => [...m, { role: 'user', content: message }]);
      setInput('');
      setBusy(true);
      setLiveTrace([]);
      setLiveText('');

      let answer = '';
      let citations: string[] = [];

      await askCopilot(message, sessionId, history, (ev: TraceEvent) => {
        if (ev.type === 'thinking') {
          setLiveTrace((t) => [...t, { kind: 'thinking', iteration: ev.iteration }]);
        } else if (ev.type === 'tool_start') {
          setLiveTrace((t) => [...t, { kind: 'tool', iteration: ev.iteration, name: ev.name, args: ev.args }]);
        } else if (ev.type === 'tool_end') {
          setLiveTrace((t) => [...t, { kind: 'tool-done', iteration: ev.iteration, name: ev.name, result: ev.result, durationMs: ev.durationMs, ok: ev.ok }]);
        } else if (ev.type === 'token') {
          answer += ev.text;
          setLiveText(answer);
        } else if (ev.type === 'final') {
          citations = ev.citations;
        } else if (ev.type === 'error') {
          answer = answer || `⚠ ${ev.message}`;
          setLiveText(answer);
        } else if (ev.type === 'done') {
          if (answer.trim()) {
            setMessages((m) => [...m, { role: 'assistant', content: answer, citations }]);
          }
          setBusy(false);
        }
      });

      setBusy(false);
    },
    [busy, messages, sessionId, setMessages],
  );

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto p-4 no-scrollbar">
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 rounded-md bg-accent-purple/20 p-1 text-accent-purple">
                <User className="h-3 w-3" />
              </span>
              <p className="text-sm text-ink">{m.content}</p>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 rounded-md bg-accent-purple/20 p-1 text-accent-purple">
                <MessageSquare className="h-3 w-3" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink/80">{m.content}</p>
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.citations.map((c) => (
                      <Citation key={c} name={c} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ),
        )}

        {/* Live agent trace — the show */}
        {(liveTrace.length > 0 || busy) && (
          <div className="ml-1 space-y-1.5 rounded-xl border border-line/10 bg-bg-100 p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-ink/30">
              <Sparkles className="h-3 w-3 text-accent-purple" />
              agent trace
            </div>
            {liveTrace.map((t, i) => (
              <ToolTrace key={i} item={t} />
            ))}
            {busy && liveTrace.length === 0 && (
              <div className="flex items-center gap-2 text-[11px] text-ink/40">
                <Loader2 className="h-3 w-3 animate-spin" /> connecting…
              </div>
            )}
            {liveText && (
              <p className="whitespace-pre-wrap border-t border-line/10 pt-2 text-sm leading-relaxed text-ink/80">
                {liveText}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && !busy && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => void send(s)}
              className="rounded-full border border-line/15 bg-bg-100 px-3 py-1.5 text-[11px] text-ink/60 transition-colors hover:border-accent-purple/40 hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="border-t border-line/10 p-3"
      >
        <div className="flex items-center gap-2 rounded-xl border border-line/15 bg-bg-100 px-3 py-2 focus-within:border-accent-purple/40">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={busy ? 'Agent is working…' : 'Ask about my work, stack, experience…'}
            disabled={busy}
            maxLength={2000}
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink/30 focus:outline-none disabled:opacity-50"
            aria-label="Ask the copilot"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-lg bg-accent-purple/15 p-2 text-accent-purple transition-colors hover:bg-accent-purple/25 disabled:opacity-30"
            aria-label="Send"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-ink/25">
          Live agent · tool-calling from scratch · <span className="font-mono">max 5 reasoning steps</span>
        </p>
      </form>
    </div>
  );
}