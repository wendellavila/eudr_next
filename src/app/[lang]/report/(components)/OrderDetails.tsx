'use client';

import { useTranslations } from 'next-intl';
import { Card, Grid, Typography, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import { formatDate } from '@/utils/functions';
import { CardHeader } from '@/components/CardHeader';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { ListRowErrorMessage } from '@/components/ListRowErrorMessage';
import { ReportDataProps } from '@/typing/props';

export function OrderDetails(props: ReportDataProps) {
  const { reportData } = props;
  const i18n = useTranslations('reportPage.labels.orderDetails');

  const status =
    reportData &&
    reportData.suppliers.filter(
      supplier =>
        supplier.protocol.filter(
          protocolItem => protocolItem.status !== 'NO_ALERT'
        ).length > 0
    ).length > 0
      ? 'HIGH'
      : 'NO_ALERT';

  return (
    <section id="order-details" className="p-4 flex flex-col items-center">
      <Card className="max-w-[1200px] w-full">
        <CardHeader
          title={i18n('title')}
          icon={
            <Icon
              icon="material-symbols:order-approve"
              width={28}
              className="mr-2"
            />
          }
        />
        {(reportData || reportData === undefined) && (
          <Grid container>
            <Grid item xs={5} md={4}>
              <Typography
                variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1
                border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
              >
                {i18n('orderNumber')}
              </Typography>
              <SkeletonLoader width={100}>
                {reportData ? (
                  <Typography variant="body2">
                    {reportData.orderNumber}
                  </Typography>
                ) : undefined}
              </SkeletonLoader>
            </Grid>
            <Grid item xs={5} md={2}>
              <Typography
                variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1
                border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
              >
                {i18n('date')}
              </Typography>
              <SkeletonLoader width={80}>
                {reportData ? (
                  <Typography variant="body2">
                    {formatDate(reportData.orderDate)}
                  </Typography>
                ) : undefined}
              </SkeletonLoader>
            </Grid>
            <Grid item xs={2} md={2}>
              <Typography
                variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1
                border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
              >
                {i18n('volume')}
              </Typography>
              <SkeletonLoader width={70}>
                {reportData ? (
                  <Typography variant="body2">{reportData.volume}</Typography>
                ) : undefined}
              </SkeletonLoader>
            </Grid>
            <Grid item xs={5} md={3}>
              <Typography
                variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
                border-b-[1px] border-x-0 xs:border-t-[1px] md:border-t-0"
              >
                {i18n('supplierNumber')}
              </Typography>
              <SkeletonLoader width={50}>
                {reportData ? (
                  <Typography variant="body2">
                    {reportData.suppliers.length}
                  </Typography>
                ) : undefined}
              </SkeletonLoader>
            </Grid>
            <Grid item xs={7} md={1}>
              <Typography
                variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
                border-b-[1px] border-x-0 xs:border-t-[1px] md:border-t-0"
              >
                {i18n('status')}
              </Typography>
              <SkeletonLoader width={25}>
                {reportData ? (
                  <Tooltip
                    title={i18n(
                      status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked'
                    )}
                  >
                    <Icon
                      icon={
                        status === 'NO_ALERT'
                          ? 'ph:seal-check-fill'
                          : 'ph:seal-warning-fill'
                      }
                      className={
                        status === 'NO_ALERT'
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }
                      width={22}
                      aria-label={i18n(
                        status === 'NO_ALERT'
                          ? 'statusUnlocked'
                          : 'statusLocked'
                      )}
                    />
                  </Tooltip>
                ) : undefined}
              </SkeletonLoader>
            </Grid>
          </Grid>
        )}
        {reportData === null && (
          <ListRowErrorMessage
            id="report-error"
            message={i18n('noOrderDetailsError')}
            type="error"
          />
        )}
      </Card>
    </section>
  );
}
