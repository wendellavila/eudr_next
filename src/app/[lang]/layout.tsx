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
      <body className={`${archivo.className} selection:bg-primary/25`}>
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
