import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  Network,
  MessageSquareText,
  Terminal,
  Link2,
  Workflow,
  FileVideo,
} from 'lucide-react';

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  icon: LucideIcon;
  accent: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

const GH = 'https://github.com/AishShrestha';

export const projects: Project[] = [
  {
    id: 'portfolio-copilot',
    title: 'Portfolio Copilot',
    tagline: 'The agent answering your questions on this site right now',
    description:
      'A hand-rolled agent loop built from scratch — no LangChain, no frameworks. Streams its full reasoning trace over SSE: thinking, tool calls, results, then a cited answer. Features RAG over my resume, rate limiting, and a visible multi-hop reasoning loop.',
    techStack: ['NestJS', 'TypeScript', 'SSE', 'RAG', 'Embeddings', 'Bifrost'],
    icon: Bot,
    accent: '#2a6f6f',
    gradient: '',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'langchain-rag-app',
    title: 'RAG Chatbot',
    tagline: 'Retrieval-Augmented Generation over documents',
    description:
      'A retrieval-augmented chatbot built with LangChain — document ingestion, chunking, embedding, and grounded Q&A with citations. The foundation that later evolved into the copilot\u2019s search_resume tool.',
    techStack: ['LangChain', 'Python', 'Embeddings', 'Vector Store'],
    icon: MessageSquareText,
    accent: '#2a6f6f',
    gradient: '',
    githubUrl: `${GH}/langchain-rag-app`,
  },
  {
    id: 'youtube-agent',
    title: 'YouTube Agent',
    tagline: 'LLM agent that researches YouTube content autonomously',
    description:
      'An agentic system that plans, searches, and summarizes YouTube content using tool-calling. Built to explore how autonomous agents handle multi-step research tasks with real APIs.',
    techStack: ['TypeScript', 'LLM Agents', 'Tool Use', 'Node.js'],
    icon: Workflow,
    accent: '#2a6f6f',
    gradient: '',
  },
  {
    id: 'sawari-expert-backend',
    title: 'Sawari Expert API',
    tagline: 'Production NestJS starter — auth, caching, queues',
    description:
      'A production-grade Nest.js API starter kit with JWT auth, PostgreSQL, Redis caching, and Docker orchestration. The backbone pattern I reuse for serious backend work.',
    techStack: ['NestJS', 'PostgreSQL', 'Redis', 'Docker', 'TypeORM', 'JWT'],
    icon: Terminal,
    accent: '#2a6f6f',
    gradient: '',
    githubUrl: `${GH}/sawari-expert-backend`,
  },
  {
    id: 'unplug-cms',
    title: 'Unplug CMS',
    tagline: 'Headless CMS with content modeling & clean public API',
    description:
      'A headless CMS backend with flexible content modeling, media handling, and a clean public API. Built with NestJS and PostgreSQL for real publishing workflows.',
    techStack: ['NestJS', 'PostgreSQL', 'Prisma', 'REST'],
    icon: Network,
    accent: '#2a6f6f',
    gradient: '',
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    tagline: 'Short links with the details done properly',
    description:
      'Collision-safe ID generation, click analytics, rate limiting, and cache-friendly redirects. The kind of small service where the engineering details actually matter.',
    techStack: ['NestJS', 'SQLite', 'Analytics', 'Rate Limiting'],
    icon: Link2,
    accent: '#2a6f6f',
    gradient: '',
  },
  {
    id: 'clipstream',
    title: 'ClipStream',
    tagline: 'Video clipping & streaming pipeline',
    description:
      'A video clipping and streaming tool — upload, cut, and serve video content through a clean interface.',
    techStack: ['Node.js', 'Video Processing', 'Streaming'],
    icon: FileVideo,
    accent: '#2a6f6f',
    gradient: '',
    githubUrl: `${GH}/clipstream`,
  },
  {
    id: 'notification-service',
    title: 'Notification Service',
    tagline: 'Multi-channel delivery: email, push, webhooks',
    description:
      'A dedicated notification microservice handling email, push, and webhook delivery with retries and delivery tracking.',
    techStack: ['TypeScript', 'Microservices', 'Queues', 'Webhooks'],
    icon: Bot,
    accent: '#2a6f6f',
    gradient: '',
    githubUrl: `${GH}/notification`,
  },
];