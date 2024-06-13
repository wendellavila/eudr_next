import { ClientI18nRedirect } from '../components/ClientI18nRedirect';
import { archivo } from '@/config/fonts';
import { getTranslations } from '@/utils/functions';

export async function generateMetadata() {
  const i18n = await getTranslations('en', 'metadata');
  return {
    title: i18n('title'),
    description: i18n('description'),
    icons: {
      icon: `https://intranet.guaxupe.com.br/assets/img/ecgl/favicon.png`,
    },
  };
}

export default function RootPage() {
  return (
    <html>
      <body className={archivo.className}>
        <ClientI18nRedirect />
      </body>
    </html>
  );
}
