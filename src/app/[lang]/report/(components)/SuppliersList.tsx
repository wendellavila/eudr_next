'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Card,
  Grid,
  IconButton,
  Skeleton,
  Typography,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { theme } from '@/config/mui-theme';
import { getSupplierStatus } from '@/utils/functions';
import { CardHeader } from '@/components/CardHeader';
import { ListRowErrorMessage } from '@/components/ListRowErrorMessage';
import { ListRowHeader } from '@/components/ListRowHeader';
import { ReportDataProps } from '@/typing/props';
import { ProtocolData, SupplierData } from '@/typing/types';
import { ExportFileMenu } from './ExportFileMenu';
import { SupplierListRow } from './SupplierListRow';

export function SuppliersList(props: ReportDataProps) {
  const { reportData } = props;

  const i18n = useTranslations('reportPage.labels');
  const isMediumOrLower = useMediaQuery(theme.breakpoints.down('lg'));

  const [selectedExportOption, setSelectedExportOption] =
    useState<null | HTMLElement>(null);
  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedExportOption(event.currentTarget);
  };

  useEffect(() => {
    const sortSuppliersByStatusAndName = (a: SupplierData, b: SupplierData) => {
      if (getSupplierStatus(a) === 'HIGH' && getSupplierStatus(b) !== 'HIGH') {
        return -1;
      }
      if (getSupplierStatus(b) === 'HIGH' && getSupplierStatus(a) !== 'HIGH') {
        return 1;
      }
      if (getSupplierStatus(a) === getSupplierStatus(b)) {
        return a.supplierName.localeCompare(b.supplierName);
      }
      return 0;
    };

    const sortReportsByStatusAndName = (a: ProtocolData, b: ProtocolData) => {
      if (a.status === 'HIGH' && b.status !== 'HIGH') return -1;
      if (b.status === 'HIGH' && a.status !== 'HIGH') return 1;
      if (a.status === b.status) {
        return i18n(`reportsPanel.protocolItems.${a.type}.name`).localeCompare(
          i18n(`reportsPanel.protocolItems.${b.type}.name`)
        );
      }
      return 0;
    };
    if (reportData) {
      reportData.suppliers.forEach(supplier =>
        supplier.protocol.sort(sortReportsByStatusAndName)
      );
      reportData.suppliers.sort(sortSuppliersByStatusAndName);
    }
  }, [reportData, i18n]);

  return (
    <section id="suppliers-list" className="p-4 flex flex-col items-center">
      <Card className="max-w-[1200px] w-full">
        <CardHeader
          icon={
            <Icon icon="ic:round-agriculture" width={31} className="mr-2" />
          }
          title={i18n('suppliersList.title')}
          actions={
            reportData && (
              <Tooltip title={i18n('suppliersList.exportAllSuppliers')}>
                <IconButton onClick={onMenuClick} className="px-0 py-1">
                  <Icon icon="mdi:download" className="text-white" />
                </IconButton>
              </Tooltip>
            )
          }
        />
        {reportData && (
          <ExportFileMenu
            title={i18n('suppliersList.exportAllSuppliers')}
            data={reportData}
            selectedExportOption={selectedExportOption}
            setSelectedExportOption={setSelectedExportOption}
            formats={{
              excel: true,
              geoJson: true,
              kml: true,
              jpg: false,
            }}
          />
        )}
        <ListRowHeader>
          <Grid
            item
            xs={2}
            md={1}
            className="px-2 flex flex-col justify-center"
          >
            <Typography
              variant="body2"
              className="font-bold break-words hyphens-auto"
            >
              {i18n('suppliersList.status')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            md={5}
            className="px-2 flex flex-col justify-center"
          >
            <Typography
              variant="body2"
              className="font-bold break-words hyphens-auto"
            >
              {i18n('suppliersList.supplierName')}
            </Typography>
          </Grid>
          <Grid item xs={5} className="px-2 flex flex-col justify-center">
            <Typography
              variant="body2"
              className="font-bold break-words hyphens-auto"
            >
              {i18n('suppliersList.farmId')}
            </Typography>
          </Grid>
        </ListRowHeader>
        {reportData &&
          reportData.suppliers.length > 0 &&
          reportData.suppliers.map(supplier => (
            <SupplierListRow
              key={`${supplier.supplierName}-${supplier.farmId}`}
              supplierData={supplier}
            />
          ))}
        {reportData === undefined && (
          <article id="suppliers-loading" className="py-2">
            <Grid container>
              <Grid
                item
                xs={2}
                md={1}
                className="px-2 flex flex-col justify-center"
              >
                <Skeleton width={25} />
              </Grid>
              <Grid
                item
                xs={4}
                md={5}
                className="px-2 flex flex-col justify-center"
              >
                <Skeleton width={isMediumOrLower ? '90%' : '80%'} />
                <Skeleton width={'60%'} />
              </Grid>
              <Grid item xs={6} className="px-2 flex flex-col justify-center">
                <Skeleton width={isMediumOrLower ? '60%' : '50%'} />
                <Skeleton width={isMediumOrLower ? '90%' : '70%'} />
              </Grid>
            </Grid>
          </article>
        )}
        {reportData === null && (
          <ListRowErrorMessage
            id="suppliers-error"
            message={i18n('suppliersList.noSuppliersError')}
            type="error"
          />
        )}
      </Card>
    </section>
  );
}
