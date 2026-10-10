import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';

import { ErrorFallback } from '@/components/error-fallback';
import { RouteMetadata } from '@/components/route-metadata';
import { AboutUs } from '@/pages/about-us';
import { BannerGenerator } from '@/pages/banner-generator';
import { LandingPage } from '@/pages/landing-page';
import { NotFoundPage } from '@/pages/not-found-page';

export const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <RouteMetadata />
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
      <Route
        element={<NotFoundPage />}
        path="*"
      />
    </Routes>
  </ErrorBoundary>
);
