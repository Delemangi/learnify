import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { CoursesSection } from '@/components/courses-section';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/hooks/use-theme';

import { SkipLink } from './components/skip-link';

export const App = () => (
  <ThemeProvider>
    <SkipLink
      href="#main"
      label="Прескокни до содржина"
    />
    <div className="min-h-screen">
      <Navbar />
      <main id="main">
        <Hero />
        <CoursesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  </ThemeProvider>
);
