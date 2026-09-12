export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  stack: string[];
};

/**
 * Real experience timeline — Ekbana, Kathmandu.
 */
export const experiences: Experience[] = [
  {
    id: 'ekbana-agentic',
    role: 'Backend Engineer & Agentic AI Developer',
    company: 'Ekbana',
    period: '2024 — Present',
    location: 'Kathmandu, Nepal',
    description:
      'Building production backend systems while expanding into agentic AI — designing LLM-powered agent workflows, custom MCP servers, and agent systems that solve real engineering problems.',
    highlights: [
      'Built a hand-rolled agent loop with visible tool-calling (no frameworks) — the copilot on this site',
      'Designed RAG pipelines with chunking, embeddings, and citation-grounded answers',
      'Explored multi-agent orchestration and autonomous agent workflows',
    ],
    stack: ['TypeScript', 'NestJS', 'LLMs', 'RAG', 'MCP', 'PostgreSQL'],
  },
  {
    id: 'ekbana-backend',
    role: 'Backend Engineer',
    company: 'Ekbana',
    period: '2022 — 2024',
    location: 'Kathmandu, Nepal',
    description:
      'Designed and shipped high-throughput REST APIs for production services. Owned database schemas, migrations, and observability. Improved CI/CD pipelines and developer experience across the team.',
    highlights: [
      'Shipped NestJS services serving production traffic',
      'Owned PostgreSQL schema design and migration strategy',
      'Levelled up the team\u2019s CI/CD and review culture',
    ],
    stack: ['Node.js', 'NestJS', 'PostgreSQL', 'Docker', 'CI/CD'],
  },
  {
    id: 'ekbana-junior',
    role: 'Software Engineer',
    company: 'Ekbana',
    period: '2020 — 2022',
    location: 'Kathmandu, Nepal',
    description:
      'Started as a junior engineer building features across the stack, graduated to owning full backend services — from schema design to deployment. Learned why clean architecture and type safety matter.',
    highlights: [
      'Owned full backend services end-to-end',
      'Learned clean architecture, type safety, and code the next engineer can read',
    ],
    stack: ['TypeScript', 'Express', 'MySQL', 'Git'],
  },
];