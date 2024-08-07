import { GeoJsonLngLat, LatLng } from '@/typing/types';

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
