'use client';
import { useTranslations } from 'next-intl';
import { Card, Grid, Typography } from '@mui/material';
import { MapViewer } from './MapViewer/MapViewer';
import { GeoJsonLngLat } from '@/typing/types';

export interface Props {
  id?: string;
  farmId: string;
  coordinates: GeoJsonLngLat[];
  city: string;
  state: string;
  area: number;
  mapRef: React.RefObject<HTMLDivElement>;
}

export function GeolocationTab(props: Props) {
  const i18n = useTranslations('reportPage.labels.geolocationPanel');

  const { id, farmId, city, state, area } = props;
  return (
    <Card component="section" id={id}>
      <Grid container component="article">
        <Grid item xs={8} md={5}>
          <Typography
            variant="body2"
            className="font-bold bg-stone-100 pl-2 py-1 block
            border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            component="span"
          >
            {i18n('farmId')}
          </Typography>
          <Typography variant="body2" className="pl-2 py-3 break-all pr-3">
            {farmId}
          </Typography>
        </Grid>
        <Grid item xs={4} md={2}>
          <Typography
            variant="body2"
            className="font-bold bg-stone-100 pl-2 py-1 block
            border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            component="span"
          >
            {i18n('area')}
          </Typography>
          <Typography variant="body2" className="pl-2 py-3">
            {area}
          </Typography>
        </Grid>
        <Grid item xs={8} md={3}>
          <Typography
            variant="body2"
            className="font-bold bg-stone-100 pl-2 py-1 block
            border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            component="span"
          >
            {i18n('city')}
          </Typography>
          <Typography variant="body2" className="pl-2 py-3">
            {city}
          </Typography>
        </Grid>
        <Grid item xs={4} md={2}>
          <Typography
            variant="body2"
            className="font-bold bg-stone-100 pl-2 py-1 block
            border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            component="span"
          >
            {i18n('state')}
          </Typography>
          <Typography variant="body2" className="pl-2 py-3">
            {state}
          </Typography>
        </Grid>
      </Grid>
      <MapViewer {...props} />
    </Card>
  );
}
