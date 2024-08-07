'use client';
import { useTranslations } from 'next-intl';
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
      <GoogleMap
        id="map"
        mapContainerStyle={{
          width: '100%',
          minHeight: '70vmin',
          borderRadius: '4px',
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
    </div>
  );
}
