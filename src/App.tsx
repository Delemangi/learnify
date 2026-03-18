import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';

import { ErrorFallback } from '@/components/error-fallback';
import { AboutUs } from '@/pages/about-us';
import { BannerGenerator } from '@/pages/banner-generator';
import { LandingPage } from '@/pages/landing-page';

export const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Routes>
      <Route
        element={<LandingPage />}
        path="/"
      />
      <Route
        element={<AboutUs />}
        path="/about"
      />
      <Route
        element={<BannerGenerator />}
        path="/banner"
      />
    </Routes>
  </ErrorBoundary>
);
