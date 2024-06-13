'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { GoogleMap, Polygon, useJsApiLoader } from '@react-google-maps/api';
import { Iconify } from '@/components/Iconify';
import { LoadingSection } from '@/components/LoadingSection';
import { GeoJsonLngLat } from '@/typing/types';
import { MapMarker } from './MapMarker';
import { LatLng } from '@/typing/types';

/**
 * Sorts a numeric array in ascending order, finds the middle of it,
 * and returns the value contained in that position.
 * @param {number[]} values - Array of numbers to be sorted and searched.
 */
function getMiddleOfSortedArray(values: number[]): number {
  const middle = Math.floor(values.length / 2);
  values.sort((a, b) => a - b);
  return values[middle];
}

/**
 * Finds the median values in an array of arrays of longitude and latitude points.
 * Retuns an array with the median longitude in the first position and the median longitude in the second.
 * This is used as a cheap way of finding a point inside a polygon.
 * @param {Array<[number,number]>} coordinates - An array of arrays with longitude in
 * the first position and latitude in the second position
 */
export function getMedianPoint(coordinates: GeoJsonLngLat[]): GeoJsonLngLat {
  const longitudes: number[] = coordinates.map(lngLat => lngLat[0]);
  const latitudes: number[] = coordinates.map(lngLat => lngLat[1]);
  return [
    getMiddleOfSortedArray(longitudes),
    getMiddleOfSortedArray(latitudes),
  ];
}

/**
 * Converts an array of arrays with longitude and latitude values to an array of LatLng objects.
 * Arrays with longitude and latitude values are the format used in GeoJSON files.
 * @param {GeoJsonLngLat[] | GeoJsonLngLat} coordinates - An array of arrays with longitude in
 * the first position and latitude in the second position, or a single array with longitude in the
 * first position and latitude in the second position
 */
export function toLatLng(coordinates: GeoJsonLngLat[]): LatLng[];
export function toLatLng(coordinates: GeoJsonLngLat): LatLng;
export function toLatLng(
  coordinates: GeoJsonLngLat | GeoJsonLngLat[]
): LatLng | LatLng[];
export function toLatLng(coordinates: any): any {
  if (typeof coordinates[0] === 'number') {
    return { lat: coordinates[1], lng: coordinates[0] };
  } else {
    return coordinates.map((lngLat: GeoJsonLngLat) => ({
      lat: lngLat[1],
      lng: lngLat[0],
    }));
  }
}

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
