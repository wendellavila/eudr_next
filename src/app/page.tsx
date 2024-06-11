'use client';
import './globals.css';

import { ClientI18nRedirect } from '../components/ClientI18nRedirect';
import { archivo } from '@/config/fonts';

export default function RootPage() {
  return (
    <html>
      <body className={archivo.className}>
        <ClientI18nRedirect />
      </body>
    </html>
  );
}
