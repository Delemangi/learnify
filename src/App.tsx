import { Route, Routes } from 'react-router-dom';

import { BannerGenerator } from '@/pages/banner-generator';
import { LandingPage } from '@/pages/landing-page';

export const App = () => (
  <Routes>
    <Route
      element={<LandingPage />}
      path="/"
    />
    <Route
      element={<BannerGenerator />}
      path="/banner"
    />
  </Routes>
);
