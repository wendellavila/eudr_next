'use client';
import './globals.css';

import { ClientI18nRedirect } from '../components/ClientI18nRedirect';

export default function RootPage() {
  return (
    <html>
      <body>
        <ClientI18nRedirect />
      </body>
    </html>
  );
}
