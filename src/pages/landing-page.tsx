import { AboutSection } from '@/components/about-section';
import { CommunitySection } from '@/components/community-section';
import { ContactSection } from '@/components/contact-section';
import { CoursesMarquee } from '@/components/courses-marquee';
import { CoursesSection } from '@/components/courses-section';
import { FaqSection } from '@/components/faq-section';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navbar';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SkipLink } from '@/components/skip-link';

export const LandingPage = () => (
  <>
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
        <FaqSection />
        <CommunitySection />
        <ContactSection />
      </main>
      <CoursesMarquee />
      <Footer />
      <ScrollToTop />
    </div>
  </>
);
