'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { i18nConfig } from '@/config/i18n';
import { getBrowserPreferredLanguage } from '@/utils/functions';
import { RootLoadingScreen } from './RootLoadingScreen';

export function ClientI18nRedirect() {
  const [locale, setLocale] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const localStorageLocale = localStorage.getItem('lang') ?? '';
    if (localStorageLocale && i18nConfig.locales.includes(localStorageLocale)) {
      setLocale(localStorageLocale);
    } else {
      setLocale(getBrowserPreferredLanguage());
    }
    if (locale) {
      router.replace(`/${locale}`);
    }
  }, [locale, router]);

  return (
    <main>
      <RootLoadingScreen id="locale-loading" />
    </main>
  );
}
