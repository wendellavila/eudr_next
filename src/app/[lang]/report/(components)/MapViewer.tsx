'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { GoogleMap, Polygon, useJsApiLoader } from '@react-google-maps/api';
import { Iconify } from '@/components/Iconify';
import { getMedianPoint, toLatLng } from '@/utils/functions';
import { LoadingSection } from '@/components/LoadingSection';
import { GeoJsonLngLat } from '@/typing/types';
import { MapMarker } from './MapMarker';

interface MapViewerProps {
  farmId: string;
  coordinates: GeoJsonLngLat[];
  city: string;
  state: string;
  area: number;
  mapRef: React.RefObject<HTMLDivElement>;
}

export function MapViewer(props: MapViewerProps) {
  const { mapRef, coordinates } = props;

  const i18n = useTranslations('reportPage.labels.geolocationPanel');
  const { isLoaded: isGoogleMapsLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY ?? '',
    version: '3.55',
  });

  if (coordinates.length === 0) {
    return (
      <div className="p-4 flex flex-row items-center">
        <Iconify
          icon="mdi:info-outline"
          className="text-red-600 mr-2"
          width={18}
        />
        <Typography>{i18n('geolocationNotFound')}</Typography>
      </div>
    );
  }

  const polygon = toLatLng(coordinates);
  const center = toLatLng(getMedianPoint(coordinates));

  const googleMap = isGoogleMapsLoaded && (
    <div ref={mapRef}>
      <GoogleMap
        id="map"
        mapContainerStyle={{ width: '100%', minHeight: '75vh' }}
        center={center}
        zoom={13}
        mapTypeId="hybrid"
      >
        {
          <>
            <Polygon
              path={polygon}
              options={{
                fillColor: 'gray',
                strokeColor: 'white',
                strokeWeight: 1,
              }}
            />
            <MapMarker center={center} {...props} />
          </>
        }
      </GoogleMap>
    </div>
  );
  return googleMap ?? <LoadingSection />;
}
