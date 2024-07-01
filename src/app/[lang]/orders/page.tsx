import { ClientOrdersPage } from './client';
import { getTranslations } from '@/utils/functions';
import { TokenProvider } from '@/context/TokenContext';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const i18n = await getTranslations(lang, 'ordersPage');
  return {
    title: i18n('title'),
    description: i18n('description'),
    icons: {
      icon: `/favicon.png`,
    },
  };
}

export default function OrdersPage() {
  return (
    <TokenProvider>
      <ClientOrdersPage />
    </TokenProvider>
  );
}
