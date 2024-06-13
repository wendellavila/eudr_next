'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { i18nConfig } from '@/config/i18n';
import { RootLoadingScreen } from './RootLoadingScreen';

/**
 * Returns the preferred language among supported languages in config/i18nConfig
 */
function getBrowserPreferredLanguage(): string {
  const languages = typeof window !== 'undefined' ? navigator.languages : [];

  for (const language of languages) {
    const lang = language.substring(0, 2); // extracting en from en-US
    if (i18nConfig.locales.includes(lang)) {
      return lang;
    }
  }
  return i18nConfig.defaultLocale;
}

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
