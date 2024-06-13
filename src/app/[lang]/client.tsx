'use client';
import { useRef } from 'react';
import { AboutSection } from './(components)/AboutSection';
import { Footer } from './(components)/Footer';
import { FrontSection } from './(components)/FrontSection';

export function ClientLoginPage() {
  const aboutRef = useRef<HTMLElement>(null);
  const registerRef = useRef<HTMLElement>(null);
  return (
    <main>
      <FrontSection aboutRef={aboutRef} registerRef={registerRef} />
      <AboutSection aboutRef={aboutRef} registerRef={registerRef} />
      <Footer />
    </main>
  );
}
