'use client';
import './globals.css';
import { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { i18nConfig } from '@/config/i18n';
import { getBrowserPreferredLanguage } from '@/utils/functions';
import { LoadingScreen } from '@/components/client';

function ClientI18nRedirect() : ReactNode {
  const [locale, setLocale] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const localStorageLocale = localStorage.getItem('lang') ?? '';
    if(localStorageLocale && i18nConfig.locales.includes(localStorageLocale)){
      setLocale(localStorageLocale);
    }
    else {
      setLocale(getBrowserPreferredLanguage());
    }
    if(locale){
      router.replace(`/${locale}`);
    }
  }, [locale, router]);

  return(
    <main>
      <LoadingScreen id="locale-loading"/>
    </main>
  );
}

export default function RootPage() {
  return (
    <html>
      <body>
        <ClientI18nRedirect/>
      </body>
    </html>
  );
}