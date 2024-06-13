import { ClientReportPage } from './client';
import { getTranslations } from '@/utils/functions';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const i18n = await getTranslations(lang, 'reportPage');
  return {
    title: i18n('title'),
    description: i18n('description'),
    icons: {
      icon: `https://intranet.guaxupe.com.br/assets/img/ecgl/favicon.png`,
    },
  };
}

export default function ReportPage() {
  return <ClientReportPage />;
}
