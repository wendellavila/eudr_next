import {
  ReportData,
  SupplierData,
  GeoJsonLngLat,
  GeoJsonFeature,
  GeoJsonFeatureCollection,
  GeoJsonBBox,
} from '@/typing/types';

import { getDownloadFilename, downloadFile } from './downloadFile';

/**
 * Downloads a GeoJSON file containing the application data
 * @param {ReportData | SupplierData} data - Full order data or single supplier data
 * @param {string} isoDate - A date string in the ISO 8601 format.
 */
export function downloadGeoJson(
  data: ReportData | SupplierData,
  isoDate?: string
) {
  const filename: string = getDownloadFilename(data, isoDate);
  const geoJsonObj = getGeoJsonObject(data);
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(geoJsonObj)
  )}`;
  downloadFile(jsonString, filename, 'json');
}

/**
 * Converts application data into a GeoJSON compatible object.
 * @param {ReportData | SupplierData} data - Full order data or single supplier data
 */
export function getGeoJsonObject(data: ReportData): GeoJsonFeatureCollection;
export function getGeoJsonObject(data: SupplierData): GeoJsonFeature;
export function getGeoJsonObject(
  data: ReportData | SupplierData
): GeoJsonFeature | GeoJsonFeatureCollection;
export function getGeoJsonObject(data: ReportData | SupplierData): any {
  // data typeof ReportData
  if ('suppliers' in data) {
    let geoJsonObj: GeoJsonFeatureCollection = {
      type: '',
      features: [],
    };
    geoJsonObj.type = 'FeatureCollection';
    let allCoordinates: GeoJsonLngLat[] = [];
    data.suppliers.forEach(supplier => {
      geoJsonObj.features.push(getGeoJsonObject(supplier));
      allCoordinates = allCoordinates.concat(supplier.coordinates);
    });
    geoJsonObj.bbox = getBBox(allCoordinates);
    return geoJsonObj;
  }
  // data typeof SupplierData
  else if ('coordinates' in data) {
    let geoJsonObj: GeoJsonFeature = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [data.coordinates],
      },
      bbox: getBBox(data.coordinates),
      properties: {
        farmId: data.farmId,
        city: data.city,
        state: data.state,
        area: data.area,
      },
    };
    return geoJsonObj;
  } else {
    return {
      type: 'FeatureCollection',
      features: [],
    };
  }
}

function getBBox(coordinates: GeoJsonLngLat[]): GeoJsonBBox {
  const longitudes: number[] = coordinates.map(lngLat => lngLat[0]);
  const latitudes: number[] = coordinates.map(lngLat => lngLat[1]);
  return [
    Math.min(...longitudes),
    Math.min(...latitudes),
    Math.max(...longitudes),
    Math.max(...latitudes),
  ];
}
