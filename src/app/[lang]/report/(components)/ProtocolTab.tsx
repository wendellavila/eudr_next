'use client';
import { useTranslations } from 'next-intl';
import { Grid, Typography, Tooltip, useMediaQuery } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { useParams } from 'next/navigation';
import { theme } from '@/config/mui-theme';
import { ListRow } from '@/components/ListRow';
import { ListRowHeader } from '@/components/ListRowHeader';
import { ProtocolData } from '@/typing/types';
import { zeroPad } from '@/utils/functions';

/**
 * Formats an ISO date string into dd/mm/yyyy hh:mm:ss
 * @param {string} isoDate - An ISO 8601 date string.
 */
function formatISODate(isoDate: string) {
  const date = new Date(isoDate);
  if (isNaN(date.getDate())) return '';

  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = zeroPad(date.getHours());
  const minutes = zeroPad(date.getMinutes());
  const seconds = zeroPad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

interface ProtocolTabProps {
  id?: string;
  lastUpdate: string;
  protocolData: ProtocolData[];
}

export function ProtocolTab(props: ProtocolTabProps) {
  const i18n = useTranslations('reportPage.labels.reportsPanel');
  const lang = useParams().lang as string;
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const { id, lastUpdate, protocolData } = props;
  return (
    <section id={id}>
      {!isSmall && (
        <ListRowHeader>
          <Grid
            item
            xs={1}
            lg={1}
            className="px-2 flex flex-col justify-center"
          >
            <Typography
              variant="body2"
              className="font-bold break-words hyphens-auto"
              component="span"
            >
              {i18n('status')}
            </Typography>
          </Grid>
          <Grid item xs={2} className="px-2 flex flex-col justify-center">
            <Typography
              variant="body2"
              className="font-bold break-words hyphens-auto"
              component="span"
            >
              {i18n('name')}
            </Typography>
          </Grid>
          <Grid item xs={2} className="px-2 flex flex-col justify-center">
            <Typography
              variant="body2"
              className="font-bold break-words hyphens-auto"
              component="span"
            >
              {i18n('institution')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            lg={7}
            className="px-2 flex flex-col justify-center"
          >
            <Typography
              variant="body2"
              className="font-bold break-words hyphens-auto"
              component="span"
            >
              {i18n('details')}
            </Typography>
          </Grid>
        </ListRowHeader>
      )}
      {protocolData.map(item => (
        <ListRow key={item.type} component="article">
          <Grid container rowSpacing={2}>
            <Grid
              item
              xs={3}
              sm={2}
              md={1}
              order={{ xs: 3, md: 1 }}
              className="px-4 md:px-2 flex flex-col md:justify-center"
            >
              {isSmall && (
                <Typography
                  variant="caption"
                  className="font-bold"
                  component="span"
                >
                  {i18n('status')}
                </Typography>
              )}
              <Tooltip
                title={i18n(
                  item.status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked'
                )}
              >
                <span>
                  <Iconify
                    icon={
                      item.status === 'NO_ALERT'
                        ? 'ph:seal-check-fill'
                        : 'ph:seal-warning-fill'
                    }
                    className={
                      item.status === 'NO_ALERT'
                        ? 'text-emerald-600'
                        : 'text-red-600'
                    }
                    width={22}
                    aria-label={i18n(
                      item.status === 'NO_ALERT'
                        ? 'statusUnlocked'
                        : 'statusLocked'
                    )}
                  />
                </span>
              </Tooltip>
            </Grid>
            <Grid
              item
              xs={5}
              md={2}
              order={{ xs: 1, md: 2 }}
              className="px-4 md:px-2 flex flex-col md:justify-center"
            >
              {isSmall && (
                <Typography
                  variant="caption"
                  className="font-bold"
                  component="span"
                >
                  {i18n('name')}
                </Typography>
              )}
              <Typography variant="body2" className="break-words hyphens-auto">
                {i18n(`protocolItems.${item.type}.name`)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sm={5}
              md={2}
              order={{ xs: 2, md: 3 }}
              className="px-4 md:px-2 flex flex-col md:justify-center"
            >
              {isSmall && (
                <Typography
                  variant="caption"
                  className="font-bold"
                  component="span"
                >
                  {i18n('institution')}
                </Typography>
              )}
              <Typography variant="body2" className="break-words hyphens-auto">
                {i18n(`protocolItems.${item.type}.institution`)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={7}
              order={{ xs: 4, md: 4 }}
              className="px-4 md:px-2 pb-2 md:pb-0 flex flex-col md:justify-center"
            >
              {isSmall && (
                <Typography
                  variant="caption"
                  className="font-bold"
                  component="span"
                >
                  {i18n('details')}
                </Typography>
              )}
              <Typography variant="body2">
                {lang === 'pt'
                  ? item.details
                  : i18n(
                      `protocolItems.${item.type}.${
                        item.status === 'NO_ALERT'
                          ? 'unlockedDetails'
                          : 'lockedDetails'
                      }`
                    ) +
                    `${
                      item.status !== 'NO_ALERT'
                        ? `\nOriginal Details: "${item.details}"`
                        : ''
                    }`}
              </Typography>
            </Grid>
          </Grid>
        </ListRow>
      ))}
      <div className="flex flex-row items-center justify-between py-3 px-4">
        <Typography variant="body2" className="mr-2">
          {i18n('lastUpdate')}:
        </Typography>
        <span className="flex flex-row items-center">
          <Iconify
            icon="mdi:clock-outline"
            className="mr-[3px] mb-[1px]"
            width={15}
          />
          <Typography variant="body2">{formatISODate(lastUpdate)}</Typography>
        </span>
      </div>
    </section>
  );
}
