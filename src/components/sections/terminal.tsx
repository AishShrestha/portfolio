'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { siteConfig, socials } from '@/lib/site';
import { askCopilot, type ChatMessage, type TraceEvent } from '@/lib/copilot';

type LineType = 'input' | 'output' | 'system' | 'agent-trace' | 'agent-tool' | 'agent-answer' | 'error';
type Line = { type: LineType; text: string };

const HELP_TEXT = [
  'Available commands:',
  '  ask <question> — ask the AI agent (live tool-calling)',
  '  about      — who I am',
  '  skills     — what I work with',
  '  projects   — things I\'ve built',
  '  contact    — how to reach me',
  '  social     — links to my profiles',
  '  clear      — clear the terminal',
  '  help       — show this help',
];

const RESPONSES: Record<string, string[]> = {
  help: HELP_TEXT,
  about: [
    `I'm ${siteConfig.name} — an AI Engineer & Backend Engineer based in ${siteConfig.location}.`,
    'I build intelligent systems with LLMs, AI agents, RAG, and scalable backends.',
  ],
  skills: [
    'AI:        OpenAI · Gemini · Ollama · RAG · AI Agents · MCP · LangChain',
    'Backend:   Node.js · Express · NestJS · REST APIs',
    'Database:  PostgreSQL · Prisma · pgvector',
    'Cloud:     Docker · Linux · GitHub · AWS (learning)',
    'Languages: TypeScript · JavaScript · Python · SQL',
  ],
  projects: [
    '▸ AI Agent Platform     — build & deploy autonomous agents',
    '▸ Multi-Agent System    — coordinated agent swarms',
    '▸ RAG Chatbot           — retrieval-augmented Q&A',
    '▸ Document Intelligence — extract & query unstructured docs',
    '▸ AI SQL Assistant      — natural language → SQL',
    'Run "ls projects" or scroll to the Projects section for details.',
  ],
  contact: [
    `Email:      ${socials.email.replace('mailto:', '')}`,
    'GitHub:     github.com/AishShrestha',
    'LinkedIn:   linkedin.com/in/aishshrestha',
    'Or use the contact form below ↓',
  ],
  social: [
    'GitHub:   github.com/AishShrestha',
    'LinkedIn: linkedin.com/in/aishshrestha',
  ],
};

export function TerminalSection() {
  const [lines, setLines] = useState<Line[]>([
    { type: 'system', text: `Welcome to ${siteConfig.name}'s terminal. Type "help" to begin. Now with a real AI agent — try: ask what is his best project?` },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [agentBusy, setAgentBusy] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const agentSession = useRef(`term-${Math.random().toString(36).slice(2, 10)}`);
  const agentHistory = useRef<ChatMessage[]>([]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const append = (...newLines: Line[]) => setLines((l) => [...l, ...newLines]);

  const runAgent = async (question: string) => {
    if (agentBusy) {
      append({ type: 'error', text: 'agent busy — one question at a time.' });
      return;
    }
    setAgentBusy(true);
    append({ type: 'agent-trace', text: '◇ agent: thinking…' });

    let answer = '';

    try {
      await askCopilot(
        question,
        agentSession.current,
        agentHistory.current,
        (ev: TraceEvent) => {
          if (ev.type === 'tool_start') {
            append({ type: 'agent-tool', text: `⚙ ${ev.name}(${JSON.stringify(ev.args ?? {})})` });
          } else if (ev.type === 'tool_end') {
            const summary = Array.isArray(ev.result)
              ? `${ev.result.length} items`
              : ev.ok
                ? 'ok'
                : 'error';
            append({ type: 'agent-trace', text: `  └ ${summary} · ${ev.durationMs}ms` });
          } else if (ev.type === 'token') {
            answer += ev.text;
            // stream the answer into the last agent-answer line
            setLines((l) => {
              const copy = [...l];
              const lastAnswerIdx = copy.map((x) => x.type).lastIndexOf('agent-answer');
              const line: Line = { type: 'agent-answer', text: answer };
              if (lastAnswerIdx >= 0) copy[lastAnswerIdx] = line;
              else copy.push(line);
              return copy;
            });
          } else if (ev.type === 'final') {
            answer = ev.text;
            setLines((l) => {
              const copy = [...l];
              const lastAnswerIdx = copy.map((x) => x.type).lastIndexOf('agent-answer');
              const line: Line = { type: 'agent-answer', text: answer };
              if (lastAnswerIdx >= 0) copy[lastAnswerIdx] = line;
              else copy.push(line);
              return copy;
            });
            if (ev.citations.length > 0) {
              append({ type: 'agent-trace', text: `▪ sources: [${ev.citations.join(', ')}] · ${ev.iterations} steps` });
            }
          } else if (ev.type === 'error') {
            append({ type: 'error', text: `✖ agent error: ${ev.message}` });
          }
        },
      );
    } catch (err) {
      append({ type: 'error', text: `✖ copilot unreachable: ${(err as Error).message}` });
    } finally {
      agentHistory.current.push(
        { role: 'user', content: question },
        { role: 'assistant', content: answer },
      );
      setAgentBusy(false);
    }
  };

  const run = (raw: string) => {
    const trimmed = raw.trim();
    const cmd = trimmed.toLowerCase();
    const newLines: Line[] = [{ type: 'input', text: raw }];

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    if (cmd === '') {
      setLines((l) => [...l, ...newLines]);
      return;
    }

    if (cmd === 'ask' || cmd.startsWith('ask ')) {
      const question = trimmed.slice(3).trim();
      setLines((l) => [...l, ...newLines]);
      if (!question) {
        append({ type: 'error', text: 'usage: ask <question> — e.g. "ask what projects has he built?"' });
      } else {
        void runAgent(question);
      }
      setHistory((h) => [raw, ...h]);
      setHistoryIndex(-1);
      return;
    }

    const response = RESPONSES[cmd];
    if (response) {
      newLines.push(...response.map((t) => ({ type: 'output' as const, text: t })));
    } else if (cmd === 'ls' || cmd === 'ls projects') {
      newLines.push({ type: 'output', text: 'projects/  skills/  experience/  contact/' });
    } else {
      newLines.push({
        type: 'error',
        text: `command not found: ${cmd} — type "help" for available commands.`,
      });
    }

    setLines((l) => [...l, ...newLines]);
    setHistory((h) => [raw, ...h]);
    setHistoryIndex(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next]) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? '' : history[next]);
    }
  };

  const lineClass = (t: LineType) => {
    switch (t) {
      case 'input':
        return 'text-[#f2f1ec]';
      case 'system':
        return 'text-[#f2f1ec]/50';
      case 'agent-trace':
        return 'text-[#7ec8c8]/60';
      case 'agent-tool':
        return 'text-[#7ec8c8]';
      case 'agent-answer':
        return 'text-[#f2f1ec]/85';
      case 'error':
        return 'text-red-600/70';
      default:
        return 'text-[#f2f1ec]/70';
    }
  };

  return (
    <section className="noise relative overflow-hidden py-24">
      <div className="container-px relative z-10">
        <Reveal className="mb-4 flex items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-purple before:block before:h-px before:w-6 before:bg-accent-purple/60">
            Terminal
          </span>
        </Reveal>

        <Reveal className="mb-8">
          <h3 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Want to know more? <span className="text-gradient">Ask the agent.</span>
          </h3>
          <p className="mt-2 text-sm text-ink/40">
            An interactive mini-shell backed by a real AI agent. Try <code className="text-accent-cyan">ask what is his experience with RAG?</code>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => inputRef.current?.focus()}
            className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line/10 bg-[#1a1a1a] shadow-glass"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-2 flex items-center gap-2 text-xs text-[#f2f1ec]/50">
                <TerminalIcon className="h-3.5 w-3.5" />
                <span>ayush@portfolio: ~</span>
              </div>
              {agentBusy && (
                <span className="ml-auto animate-pulse text-[10px] font-mono text-[#7ec8c8]">● agent running</span>
              )}
            </div>

            {/* Body */}
            <div
              ref={containerRef}
              data-lenis-prevent
              className="h-[300px] overflow-y-auto p-4 font-mono text-sm leading-relaxed no-scrollbar"
            >
              {lines.map((line, i) => (
                <div key={i} className={lineClass(line.type)}>
                  {line.type === 'input' && (
                    <>
                      <span className="text-accent-purple/70">ayush@portfolio</span>
                      <span className="text-ink/40">:~$ </span>
                    </>
                  )}
                  <span className="whitespace-pre-wrap">{line.text}</span>
                </div>
              ))}

              {/* Prompt */}
              <div className="flex items-center text-[#f2f1ec]">
                <span className="text-[#7ec8c8]">ayush@portfolio</span>
                <span className="text-[#f2f1ec]/40">:~$ </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  disabled={agentBusy}
                  className="ml-1 flex-1 bg-transparent text-[#f2f1ec] caret-[#7ec8c8] focus:outline-none disabled:opacity-40"
                  aria-label="Terminal input"
                />
                <ChevronRight className="h-4 w-4 text-[#7ec8c8]/50" />
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}