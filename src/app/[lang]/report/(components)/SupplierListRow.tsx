'use client';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Grid, Typography, Tooltip } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { getSupplierStatus } from '@/utils/functions';
import { ListRow } from '@/components/ListRow';
import { SupplierDataProps } from '@/typing/props';
import { SupplierTabs } from './SupplierTabs';

export function SupplierListRow(props: SupplierDataProps) {
  const { supplierData: supplier } = props;
  const [isOpen, setOpen] = useState<boolean>(false);
  const i18n = useTranslations('reportPage.labels');
  const status = getSupplierStatus(supplier);
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <ListRow
      component="article"
      key={`${supplier.supplierName}-${supplier.farmId}`}
      panel={<SupplierTabs supplierData={supplier} mapRef={mapRef} />}
      isOpen={isOpen}
      setPanelState={setOpen}
    >
      <Grid container>
        <Grid item xs={2} md={1} className="px-2 flex flex-col justify-center">
          <Tooltip
            title={i18n(
              `suppliersList.${
                status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked'
              }`
            )}
          >
            <Iconify
              icon={
                status === 'NO_ALERT'
                  ? 'ph:seal-check-fill'
                  : 'ph:seal-warning-fill'
              }
              className={
                status === 'NO_ALERT' ? 'text-emerald-600' : 'text-red-600'
              }
              width={22}
              aria-label={i18n(
                `suppliersList.${
                  status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked'
                }`
              )}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={4} md={5} className="px-2 flex flex-col justify-center">
          <Typography variant="body2">{supplier.supplierName}</Typography>
        </Grid>
        <Grid item xs={5} className="px-2 flex flex-col justify-center">
          <Typography variant="body2" className="break-words">
            {supplier.farmId}
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          className="px-2 flex flex-col justify-center items-end"
        >
          <Tooltip title={i18n(`suppliersList.${isOpen ? 'close' : 'expand'}`)}>
            <Iconify
              icon="mdi:chevron-down"
              width={30}
              className={`text-neutral-600 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </ListRow>
  );
}
