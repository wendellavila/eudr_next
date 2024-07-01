'use client';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Iconify } from '@/components/Iconify';
import { CardHeader } from '@/components/CardHeader';

export function OrdersLink() {
  const router = useRouter();
  const lang = useParams().lang;
  const i18n = useTranslations('dashboardPage.labels');

  return (
    <Card
      component="a"
      onClick={event => {
        event.preventDefault();
        router.push(`/${lang}/orders`);
      }}
      className="flex flex-col h-full
      hover:cursor-pointer hover:scale-y-[102%] hover:scale-x-[101%] transition"
    >
      <CardHeader
        title={i18n('orders')}
        icon={<Iconify icon="mingcute:ship-line" className="mr-3" width={22} />}
      />
      <div className="grow p-4 flex flex-row items-center justify-center text-lg">
        <Iconify icon="mdi:search" className="mr-2" width={20} />
        <span>{i18n('viewAllOrders')}</span>
      </div>
    </Card>
  );
}
