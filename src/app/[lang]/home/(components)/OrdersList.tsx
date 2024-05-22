'use client';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Card, Grid, Typography, Skeleton } from '@mui/material';
import { Icon } from '@iconify/react';
import { formatDate } from '@/utils/functions';
import { CardHeader } from '@/components/CardHeader';
import { ListRow } from '@/components/ListRow';
import { ListRowErrorMessage } from '@/components/ListRowErrorMessage';
import { ListRowHeader } from '@/components/ListRowHeader';
import { OrderData } from '@/typing/types';

interface OrdersListProps {
  ordersData?: OrderData[] | null;
  searchText: string;
  minDate: string;
  maxDate: string;
  minVolume: number;
  maxVolume: number;
}

export function OrdersList(props: OrdersListProps) {
  const { ordersData, minDate, maxDate, minVolume, maxVolume, searchText } =
    props;
  const lang = useParams().lang as string;
  const i18n = useTranslations('homePage.labels.orders');

  const filteredOrdersData = useMemo<OrderData[]>(
    () =>
      ordersData
        ? ordersData.filter(row => {
            // each filter match everything if empty/unset
            const searchTextMatches = row.orderNumber.includes(
              searchText ?? ''
            );
            const dateBiggerOrEqualMin = minDate
              ? parseInt(row.date) >= parseInt(minDate)
              : true;
            const dateSmallerOrEqualMax = maxDate
              ? parseInt(row.date) <= parseInt(maxDate)
              : true;
            const volumeInRange =
              row.volume >= minVolume && row.volume <= maxVolume;
            return (
              searchTextMatches &&
              dateBiggerOrEqualMin &&
              dateSmallerOrEqualMax &&
              volumeInRange
            );
          })
        : [],
    [ordersData, minDate, maxDate, minVolume, maxVolume, searchText]
  );

  return (
    <Card component="section" id="orders-list">
      <CardHeader
        title={i18n('title')}
        icon={<Icon icon="mingcute:ship-line" width={28} className="mr-2" />}
      />
      <ListRowHeader>
        <Grid item xs={5} className="px-2 flex flex-col justify-center">
          <Typography variant="body2" className="font-bold">
            {i18n('orderNumber')}
          </Typography>
        </Grid>
        <Grid item xs={4} className="px-2 flex flex-col justify-center">
          <Typography variant="body2" className="font-bold">
            {i18n('date')}
          </Typography>
        </Grid>
        <Grid item xs={3} className="px-2 flex flex-col justify-center">
          <Typography variant="body2" className="font-bold">
            {i18n('volume')}
          </Typography>
        </Grid>
      </ListRowHeader>
      {filteredOrdersData &&
        filteredOrdersData.map(row => {
          const searchParams = new URLSearchParams();
          searchParams.set('oid', row.orderNumber);
          return (
            <ListRow
              key={row.orderNumber}
              href={`/${lang}/report?${searchParams}`}
            >
              <Grid container>
                <Grid item xs={5} className="px-2 flex flex-col justify-center">
                  <Typography variant="body2">{row.orderNumber}</Typography>
                </Grid>
                <Grid item xs={4} className="px-2 flex flex-col justify-center">
                  <Typography variant="body2">
                    {formatDate(row.date)}
                  </Typography>
                </Grid>
                <Grid item xs={3} className="px-2 flex flex-col justify-center">
                  <Typography variant="body2">{row.volume}</Typography>
                </Grid>
              </Grid>
            </ListRow>
          );
        })}
      {ordersData === undefined && (
        <article id="orders-loading" className="py-2">
          <Grid container>
            <Grid item xs={5} className="px-2 flex flex-col justify-center">
              <Typography variant="body2">
                <Skeleton width={150} />
              </Typography>
            </Grid>
            <Grid item xs={4} className="px-2 flex flex-col justify-center">
              <Typography variant="body2">
                <Skeleton width={100} />
              </Typography>
            </Grid>
            <Grid item xs={3} className="px-2 flex flex-col justify-center">
              <Typography variant="body2">
                <Skeleton width={70} />
              </Typography>
            </Grid>
          </Grid>
        </article>
      )}
      {ordersData === null && (
        <ListRowErrorMessage
          id="orders-error"
          message={i18n('noOrdersError')}
          type="error"
        />
      )}
      {ordersData &&
        ordersData.length > 0 &&
        filteredOrdersData.length === 0 && (
          <ListRowErrorMessage
            id="orders-filter-none"
            message={i18n('noFilteredOrdersAlert')}
            type="alert"
          />
        )}
    </Card>
  );
}
