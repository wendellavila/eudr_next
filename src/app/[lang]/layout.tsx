import { NextIntlClientProvider } from 'next-intl';

import { archivo } from '@/config/fonts';
import { getTranslationMessages } from '@/utils/functions';
import { ClientProviderLoader } from './(components)/ClientProviderLoader';
import { i18nConfig } from '@/config/i18n';

/**
 * Generates Next.js SSG Static Params using the locales defined in i18nConfig.
 */
export async function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ lang: locale }));
}

export default async function InternationalizedLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const i18n = await getTranslationMessages(lang);
  return (
    <html lang={lang}>
      <body
        className={`m-0 box-border ${archivo.className} min-h-dvh
      bg-white text-foreground  selection:bg-coffee-400/25 flex flex-col
      `}
      >
        <NextIntlClientProvider
          locale={lang}
          messages={i18n}
          timeZone="America/Sao_Paulo"
          now={new Date()}
        >
          <ClientProviderLoader>{children}</ClientProviderLoader>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
