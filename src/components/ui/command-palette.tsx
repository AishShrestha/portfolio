'use client';

import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import {
  Home,
  User,
  Code2,
  FolderGit2,
  Briefcase,
  PenLine,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { navLinks, socials, siteConfig } from '@/lib/site';

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Item = {
  label: string;
  hint?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenChange]);

  const go = (href: string) => {
    onOpenChange(false);
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, '_blank');
    }
  };

  const navItems: Item[] = navLinks.map((l) => ({
    label: l.label,
    hint: `Go to ${l.label} section`,
    icon: iconFor(l.label),
    action: () => go(l.href),
    group: 'Navigation',
  }));

  const socialItems: Item[] = [
    {
      label: 'GitHub',
      hint: 'Open GitHub profile',
      icon: <Github className="h-4 w-4" />,
      action: () => go(socials.github),
      group: 'Social',
    },
    {
      label: 'LinkedIn',
      hint: 'Open LinkedIn profile',
      icon: <Linkedin className="h-4 w-4" />,
      action: () => go(socials.linkedin),
      group: 'Social',
    },
    {
      label: 'Email',
      hint: 'Send an email',
      icon: <Mail className="h-4 w-4" />,
      action: () => go(socials.email),
      group: 'Social',
    },
  ];

  const items = [...navItems, ...socialItems];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ scale: 0.96, y: -10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -10, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="container-px mt-[15vh] w-full max-w-xl"
          >
            <Command className="overflow-hidden rounded-2xl border border-line/10 bg-bg-50/95 shadow-glass backdrop-blur-2xl">
              <div className="flex items-center gap-3 border-b border-line/5 px-4">
                <Command className="h-4 w-4 text-ink/40" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search…"
                  className="w-full bg-transparent py-4 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
                />
                <kbd className="rounded border border-line/10 px-1.5 py-0.5 text-[10px] text-ink/40">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-[50vh] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-ink/40">
                  No results found.
                </Command.Empty>

                {['Navigation', 'Social'].map((group) => (
                  <Command.Group
                    key={group}
                    heading={group}
                    className="text-xs uppercase tracking-wider text-ink/30"
                  >
                    {items
                      .filter((i) => i.group === group)
                      .map((item) => (
                        <Command.Item
                          key={item.label}
                          value={`${item.label} ${item.hint ?? ''}`}
                          onSelect={() => item.action()}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink/80 data-[selected=true]:bg-surface/5 data-[selected=true]:text-ink"
                        >
                          <span className="text-accent-purple">{item.icon}</span>
                          <span className="flex-1">{item.label}</span>
                          {item.hint && (
                            <span className="text-xs text-ink/30">{item.hint}</span>
                          )}
                        </Command.Item>
                      ))}
                  </Command.Group>
                ))}
              </Command.List>
              <div className="border-t border-line/5 px-4 py-2.5 text-[11px] text-ink/30">
                {siteConfig.name} · Command Palette
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function iconFor(label: string): React.ReactNode {
  switch (label) {
    case 'About':
      return <User className="h-4 w-4" />;
    case 'Skills':
      return <Code2 className="h-4 w-4" />;
    case 'Projects':
      return <FolderGit2 className="h-4 w-4" />;
    case 'Experience':
      return <Briefcase className="h-4 w-4" />;
    case 'Blog':
      return <PenLine className="h-4 w-4" />;
    case 'Contact':
      return <Mail className="h-4 w-4" />;
    default:
      return <Home className="h-4 w-4" />;
  }
}