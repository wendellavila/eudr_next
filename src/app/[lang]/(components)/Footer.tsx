'use client';

import { CopyrightText } from '@/components/CopyrightText';

export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-stone-800 py-4 flex text-white items-center justify-center"
    >
      <CopyrightText />
    </footer>
  );
}
