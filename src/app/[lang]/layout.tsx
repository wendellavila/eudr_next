import { NextIntlClientProvider } from 'next-intl'

import { archivo } from '@/config/fonts';
import { getTranslationMessages } from '@/utils/functions';
import { ClientProviderLoader } from './client-providers';
export { generateStaticParams, generateMetadata } from '@/utils/functions';

export default async function InternationalizedLayout({
  children, params: {lang}
}: {
  children: React.ReactNode,
  params : {lang: string},
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
          <ClientProviderLoader>
            {children}
          </ClientProviderLoader>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
