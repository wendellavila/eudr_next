'use client';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Card, Grid, Skeleton } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { formatDate } from '@/utils/functions';
import { CardHeader } from '@/components/CardHeader';
import { ListRow } from '@/components/ListRow';
import { StatusMessage } from '@/components/StatusMessage';
import { ListRowHeader } from '@/components/ListRowHeader';
import { SortArrow } from './SortArrow';

interface OrderDataItem {
  orderNumber: string;
  date: string;
  volume: number;
  customerName?: string;
}
interface OrdersListProps {
  ordersData?: OrderDataItem[] | null;
  searchText: string;
  minDate: string;
  maxDate: string;
  minVolume: number;
  maxVolume: number;
  showCustomerName?: boolean;
}

export type SortBy =
  | 'orderNumberAsc'
  | 'orderNumberDesc'
  | 'dateAsc'
  | 'dateDesc'
  | 'volumeAsc'
  | 'volumeDesc'
  | 'customerNameAsc'
  | 'customerNameDesc';

function sortOrders(orders: OrderDataItem[], sortBy: SortBy) {
  const toNum = (n: number | string) =>
    typeof n === 'string' ? parseInt(n, 10) : n;
  const numCompare = (a: number | string, b: number | string) =>
    toNum(a) - toNum(b);
  const strCompare = (a: string, b: string) => a.localeCompare(b);

  const orderNumberToNum = (orderNumber: string) => {
    const parts = orderNumber.split('/');
    const year = parts[1];
    const num = parts[0];
    return toNum(year + num);
  };

  switch (sortBy) {
    case 'orderNumberAsc':
      return orders.sort((a, b) =>
        numCompare(
          orderNumberToNum(a.orderNumber),
          orderNumberToNum(b.orderNumber)
        )
      );
    case 'orderNumberDesc':
      return orders.sort((a, b) =>
        numCompare(
          orderNumberToNum(b.orderNumber),
          orderNumberToNum(a.orderNumber)
        )
      );
    case 'volumeAsc':
      return orders.sort((a, b) => numCompare(a.volume, b.volume));
    case 'volumeDesc':
      return orders.sort((a, b) => numCompare(b.volume, a.volume));
    case 'customerNameAsc':
      return orders.sort((a, b) =>
        strCompare(a.customerName!, b.customerName!)
      );
    case 'customerNameDesc':
      return orders.sort((a, b) =>
        strCompare(b.customerName!, a.customerName!)
      );
    case 'dateAsc':
      return orders.sort((a, b) => numCompare(a.date, b.date));
    default: //dateDesc
      return orders.sort((a, b) => numCompare(b.date, a.date));
  }
}

export function OrdersList(props: OrdersListProps) {
  const lang = useParams().lang as string;
  const i18n = useTranslations('ordersPage.labels.orders');

  const {
    minDate,
    maxDate,
    minVolume,
    maxVolume,
    ordersData,
    searchText,
    showCustomerName,
  } = props;

  const [sortBy, setSortBy] = useState<SortBy>('dateDesc');

  const filteredOrdersData = useMemo<OrderDataItem[]>(() => {
    return ordersData
      ? sortOrders(
          ordersData.filter(row => {
            // each filter match everything if empty/unset
            const searchTextMatchesOrderNumber = row.orderNumber
              .toLocaleUpperCase()
              .includes(searchText ? searchText.toLocaleUpperCase() : '');
            const searchTextMatchesCustomerName =
              row.customerName !== undefined &&
              row.customerName
                .toLocaleUpperCase()
                .includes(searchText ? searchText.toLocaleUpperCase() : '');

            const searchTextMatches = showCustomerName
              ? searchTextMatchesCustomerName || searchTextMatchesOrderNumber
              : searchTextMatchesOrderNumber;

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
          }),
          sortBy
        )
      : [];
  }, [
    ordersData,
    minDate,
    maxDate,
    minVolume,
    maxVolume,
    searchText,
    showCustomerName,
    sortBy,
  ]);

  return (
    <Card component="section" id="orders-list">
      <CardHeader
        title={i18n('title')}
        icon={<Iconify icon="mingcute:ship-line" width={28} className="mr-3" />}
      />
      <ListRowHeader>
        <Grid
          item
          xs={showCustomerName ? 2 : 5}
          className="px-2 flex flex-row items-center"
        >
          <span className="font-bold text-sm">{i18n('orderNumber')}</span>
          <button
            className="group hover:cursor-pointer bg-transparent border-none p-0"
            onClick={() => {
              setSortBy(
                sortBy === 'orderNumberAsc'
                  ? 'orderNumberDesc'
                  : 'orderNumberAsc'
              );
            }}
          >
            <SortArrow
              sortBy={sortBy}
              sortAsc="orderNumberAsc"
              sortDesc="orderNumberDesc"
            />
          </button>
        </Grid>
        {showCustomerName && (
          <Grid item xs={6} className="px-2 flex flex-row items-center">
            <span className="font-bold text-sm">{i18n('customerName')}</span>
            <button
              className="group hover:cursor-pointer bg-transparent border-none p-0"
              onClick={() => {
                setSortBy(
                  sortBy === 'customerNameAsc'
                    ? 'customerNameDesc'
                    : 'customerNameAsc'
                );
              }}
            >
              <SortArrow
                sortBy={sortBy}
                sortAsc="customerNameAsc"
                sortDesc="customerNameDesc"
              />
            </button>
          </Grid>
        )}
        <Grid
          item
          xs={showCustomerName ? 2 : 4}
          className="px-2 flex flex-row items-center"
        >
          <span className="font-bold text-sm">{i18n('date')}</span>
          <button
            className="group hover:cursor-pointer bg-transparent border-none p-0"
            onClick={() => {
              setSortBy(sortBy === 'dateAsc' ? 'dateDesc' : 'dateAsc');
            }}
          >
            <SortArrow sortBy={sortBy} sortAsc="dateAsc" sortDesc="dateDesc" />
          </button>
        </Grid>
        <Grid
          item
          xs={showCustomerName ? 2 : 3}
          className="px-2 flex flex-row items-center"
        >
          <span className="font-bold text-sm">{i18n('volume')}</span>
          <button
            className="group hover:cursor-pointer bg-transparent border-none p-0"
            onClick={() => {
              setSortBy(sortBy === 'volumeAsc' ? 'volumeDesc' : 'volumeAsc');
            }}
          >
            <SortArrow
              sortBy={sortBy}
              sortAsc="volumeAsc"
              sortDesc="volumeDesc"
            />
          </button>
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
                <Grid
                  item
                  xs={showCustomerName ? 2 : 5}
                  className="px-2 flex flex-col justify-center"
                >
                  <span className="text-sm">{row.orderNumber}</span>
                </Grid>
                {showCustomerName && (
                  <Grid
                    item
                    xs={6}
                    className="px-2 flex flex-col justify-center"
                  >
                    <span className="text-sm">{row.customerName}</span>
                  </Grid>
                )}
                <Grid
                  item
                  xs={showCustomerName ? 2 : 4}
                  className="px-2 flex flex-col justify-center"
                >
                  <span className="text-sm">{formatDate(row.date)}</span>
                </Grid>
                <Grid
                  item
                  xs={showCustomerName ? 2 : 3}
                  className="px-2 flex flex-col justify-center"
                >
                  <span className="text-sm">{row.volume}</span>
                </Grid>
              </Grid>
            </ListRow>
          );
        })}
      {ordersData === undefined && (
        <article id="orders-loading" className="py-2">
          <Grid container>
            <Grid
              xs={showCustomerName ? 2 : 5}
              className="px-2 flex flex-col justify-center"
            >
              <span className="text-sm">
                <Skeleton width={showCustomerName ? 50 : 150} />
              </span>
            </Grid>
            {showCustomerName && (
              <Grid item xs={6} className="px-2 flex flex-col justify-center">
                <span className="text-sm">
                  <Skeleton width={200} />
                </span>
              </Grid>
            )}
            <Grid
              item
              xs={showCustomerName ? 2 : 4}
              className="px-2 flex flex-col justify-center"
            >
              <span className="text-sm">
                <Skeleton width={showCustomerName ? 50 : 100} />
              </span>
            </Grid>
            <Grid
              item
              xs={showCustomerName ? 2 : 3}
              className="px-2 flex flex-col justify-center"
            >
              <span className="text-sm">
                <Skeleton width={showCustomerName ? 50 : 100} />
              </span>
            </Grid>
          </Grid>
        </article>
      )}
      {ordersData === null && (
        <StatusMessage id="orders-error" type="error" className="mb-2">
          {i18n('noOrdersError')}
        </StatusMessage>
      )}
      {ordersData &&
        ordersData.length > 0 &&
        filteredOrdersData.length === 0 && (
          <StatusMessage id="orders-filter-none" type="alert" className="mb-2">
            {i18n('noFilteredOrdersAlert')}
          </StatusMessage>
        )}
    </Card>
  );
}
