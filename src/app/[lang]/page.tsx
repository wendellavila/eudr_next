import { ClientLoginPage } from './client';
import { getTranslations } from '@/utils/functions';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const i18n = await getTranslations(lang, 'loginPage');
  return {
    title: i18n('title'),
    description: i18n('description'),
    icons: {
      icon: `/favicon.png`,
    },
  };
}

export default function LoginPage() {
  return <ClientLoginPage />;
}
