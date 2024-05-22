'use client';

import { Scrollbars } from 'react-custom-scrollbars-2';

import { AboutSection } from './(components)/AboutSection';
import { Footer } from './(components)/Footer';
import { FrontSection } from './(components)/FrontSection';

export default function LoginPage() {
  return (
    <main>
      <Scrollbars universal style={{ width: '100vw', height: '100vh' }}>
        <FrontSection />
        <AboutSection />
        <Footer />
      </Scrollbars>
    </main>
  );
}
