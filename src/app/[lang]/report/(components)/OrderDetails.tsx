'use client';
import { useTranslations } from 'next-intl';
import { Avatar, Card, Grid, Typography, Tooltip } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { formatDate } from '@/utils/functions';
import { CardHeader } from '@/components/CardHeader';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { useReportDataContext } from '@/context/ReportDataContext';
import { StatusMessage } from '@/components/StatusMessage';

export function OrderDetails() {
  const i18n = useTranslations('reportPage.labels.orderDetails');

  const reportData = useReportDataContext();

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

  const showCustomer = reportData && reportData.customerName !== undefined;
  const countryCode =
    reportData && reportData.countryCode !== undefined
      ? reportData.countryCode
      : '';

  return (
    <section id="order-details" className="p-4 flex flex-col items-center">
      <Card className="max-w-[1200px] w-full animate-fade-up animate-duration-[800ms]">
        <CardHeader
          title={i18n('title')}
          icon={
            <Iconify
              icon="material-symbols:order-approve"
              width={28}
              className="mr-3"
            />
          }
        />
        {(reportData || reportData === undefined) && (
          <Grid container>
            <Grid item xs={5} md={3}>
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
            <Grid item xs={5} md={3}>
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
            <Grid item xs={showCustomer ? 5 : 7} md={1}>
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
                    aria-label={i18n(
                      status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked'
                    )}
                  >
                    <span>
                      <Iconify
                        icon={
                          status === 'NO_ALERT'
                            ? 'ph:seal-check-fill'
                            : 'ph:seal-warning-fill'
                        }
                        className={`
                        ${
                          status === 'NO_ALERT'
                            ? 'text-emerald-600'
                            : 'text-red-600'
                        }`}
                        width={22}
                      />
                    </span>
                  </Tooltip>
                ) : undefined}
              </SkeletonLoader>
            </Grid>
            {showCustomer && (
              <Grid item xs={2} md={3}>
                <Typography
                  variant="body2"
                  className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
                  border-b-[1px] border-x-0 border-t-[1px]"
                >
                  {i18n('country')}
                </Typography>
                <SkeletonLoader width={100}>
                  {reportData ? (
                    countryCode !== '' ? (
                      <Avatar
                        className=" w-6 h-6 border border-solid
                     border-neutral-300 bg-neutral-300"
                      >
                        <Iconify
                          icon={`circle-flags:${countryCode}`}
                          width={25}
                        />
                      </Avatar>
                    ) : (
                      <Avatar
                        className=" w-6 h-6 border border-solid
                       border-neutral-400 bg-transparent text-neutral-400"
                      >
                        <Iconify icon={'mdi:question-mark'} width={22} />
                      </Avatar>
                    )
                  ) : undefined}
                </SkeletonLoader>
              </Grid>
            )}
            {showCustomer && (
              <Grid item xs={12} md={9}>
                <Typography
                  variant="body2"
                  className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
                  border-b-[1px] border-x-0 border-t-[1px]"
                >
                  {i18n('customerName')}
                </Typography>
                <SkeletonLoader width={100}>
                  {reportData ? (
                    <Typography variant="body2">
                      {reportData.customerName}
                    </Typography>
                  ) : undefined}
                </SkeletonLoader>
              </Grid>
            )}
          </Grid>
        )}
        {reportData === null && (
          <StatusMessage id="report-error" type="error">
            {i18n('noOrderDetailsError')}
          </StatusMessage>
        )}
      </Card>
    </section>
  );
}
