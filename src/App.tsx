import { Route, Routes } from 'react-router-dom';

import { AboutUs } from '@/pages/about-us';
import { BannerGenerator } from '@/pages/banner-generator';
import { LandingPage } from '@/pages/landing-page';

export const App = () => (
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
);
