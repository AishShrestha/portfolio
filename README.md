# Ayush Shrestha — Portfolio

Minimal portfolio with an **agentic AI copilot** built from scratch — no frameworks, live tool-calling trace over SSE.

**Live:** https://aishshrestha.github.io/portfolio/

## The interesting part

- `src/components/copilot/` — floating widget + live agent trace (thinking → tool calls → tokens → citations)
- `src/components/sections/terminal.tsx` — interactive mini-shell where `ask <question>` hits the real agent
- Backend (separate repo): hand-rolled agent loop in NestJS — `agent.service.ts` (loop, max 5 iterations), `bifrost.client.ts` (streaming + tool-call assembly), `tool.registry.ts` (get_projects, get_experience, get_skills, get_profile, search_resume), RAG over resume chunks, rate limiting, SSE via raw `@Res()` writes.

## Stack

- **Frontend:** Next.js 14 (static export), Tailwind, framer-motion, self-hosted Bricolage Grotesque / DM Sans / JetBrains Mono
- **Backend:** NestJS 10, SSE, RAG (nomic-embed-text via Ollama), chat via Bifrost (glm-5.3)
- **Deploy:** GitHub Pages (frontend, Actions workflow), backend TBD (Render/Railway)

## Development

```bash
npm install
npm run dev          # http://localhost:3000
```

Set `NEXT_PUBLIC_COPILOT_API` in `.env.local` to point at the backend (default `http://localhost:4311`).

## Deploy

Pushes to `main` auto-deploy via `.github/workflows/deploy.yml` (static export → GitHub Pages).

Repo variable `NEXT_PUBLIC_COPILOT_API` should hold the public backend URL once the backend is hosted.