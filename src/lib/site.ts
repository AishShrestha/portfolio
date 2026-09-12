export type NavLink = {
  label: string;
  href: string;
  number: string;
};

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about', number: '01' },
  { label: 'Experience', href: '#experience', number: '02' },
  { label: 'Skills', href: '#skills', number: '03' },
  { label: 'Projects', href: '#projects', number: '04' },
  { label: 'Terminal', href: '#terminal', number: '05' },
  { label: 'Contact', href: '#contact', number: '06' },
];

export const socials = {
  github: 'https://github.com/AishShrestha',
  linkedin: 'https://www.linkedin.com/in/aishshrestha',
  
  email: 'mailto:ekbanaayush@gmail.com',
};

export const siteConfig = {
  name: 'Ayush Shrestha',
  title: 'Backend Engineer · Agentic AI Developer',
  description:
    'Backend engineer building agentic AI systems — hand-rolled agent loops, RAG pipelines, and production APIs. Currently at Ekbana, Kathmandu.',
  url: 'https://ayushshrestha.vercel.app',
  location: 'Kathmandu, Nepal',
  ogImage: '/og.png',
};