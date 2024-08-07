'use client';
import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import { MapMarker } from '../MapMarker';
import { StatusMessage } from '@/components/StatusMessage';

import { getMedianPoint, toLatLng } from './functions';
import { Props } from '../GeolocationTab';

export function MapViewer(props: Props) {
  const { coordinates, mapRef } = props;
  const i18n = useTranslations('reportPage.labels.geolocationPanel');

  if (coordinates.length === 0) {
    return (
      <StatusMessage type="error">{i18n('geolocationNotFound')}</StatusMessage>
    );
  }

  const polygon = toLatLng(coordinates);
  const center = toLatLng(getMedianPoint(coordinates));

  return (
    <div ref={mapRef} className="bg-gray-200 animate-fade rounded">
      <ErrorBoundary
        fallback={
          <div className="overflow-auto py-8 min-h-[700px] flex flex-col justify-center">
            <StatusMessage
              type="error"
              className="!mt-0"
              textClassName="text-lg"
              iconSize={20}
            >
              {i18n('mapUnavailable')}
            </StatusMessage>
          </div>
        }
      >
        <GoogleMap
          id="map"
          mapContainerStyle={{
            width: '100%',
            minHeight: '70vmin',
          }}
          center={center}
          onCenterChanged={() => {}}
          zoom={16}
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
      </ErrorBoundary>
    </div>
  );
}
