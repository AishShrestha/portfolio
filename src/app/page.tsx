import { SmoothScroll } from '@/components/providers/smooth-scroll';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Blog } from '@/components/sections/blog';
import { Contact } from '@/components/sections/contact';
import { TerminalSection } from '@/components/sections/terminal';
import { CopilotWidget } from '@/components/copilot/copilot-widget';

export default function HomePage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <TerminalSection />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <CopilotWidget />
    </SmoothScroll>
  );
}