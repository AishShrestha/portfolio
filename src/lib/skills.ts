import {
  Bot,
  Server,
  Database,
  Cloud,
  Terminal,
  Code2,
  type LucideIcon,
} from 'lucide-react';

export type SkillCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai',
    title: 'AI & LLMs',
    icon: Bot,
    color: '#2a6f6f',
    skills: [
      'OpenAI',
      'Gemini',
      'Ollama',
      'Local LLMs',
      'Embeddings',
      'Vector Databases',
      'RAG',
      'Prompt Engineering',
      'AI Agents',
      'MCP',
      'LangChain',
      'Agent Frameworks',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    color: '#2a6f6f',
    skills: ['Node.js', 'Express.js', 'NestJS', 'REST APIs'],
  },
  {
    id: 'database',
    title: 'Database',
    icon: Database,
    color: '#2a6f6f',
    skills: ['PostgreSQL', 'Prisma ORM', 'pgvector'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: '#2a6f6f',
    skills: ['Docker', 'GitHub', 'Linux', 'AWS (learning)'],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: Terminal,
    color: '#2a6f6f',
    skills: ['Cursor', 'Claude Code', 'Pi', 'OpenClaw', 'Git', 'Postman'],
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: Code2,
    color: '#2a6f6f',
    skills: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  },
];