export interface OrderData {
    orderNumber: string;
    date: string;
    volume: number;
};
export interface SupplierData {
    supplierName: string;
    farmId: string;
    status: string;
    city: string;
    state: string;
    area: number;
    lastUpdate: string;
    protocol: ProtocolData[];
    coordinates: GeoJsonLngLat[];
};
export interface ProtocolData {
    type: string;
    status: string;
    details: string;
}
export interface ReportData {
    orderNumber: string;
    orderDate: string;
    volume: number;
    status: string;
    timestamp: string;
    suppliers: SupplierData[];
};
export interface SourcesData {
    [type: string] : {
        image: string;
        url: string;
    }
}
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export interface LatLng {
    lat: number;
    lng: number;
}
export type GeoJsonLngLat = [number, number];
export type GeoJsonBBox = [number, number, number, number];
export interface GeoJsonFeatureCollection {
    type: string;
    bbox?: GeoJsonBBox;
    features : GeoJsonFeature[];
}
export interface GeoJsonFeature {
    type: string;
    bbox?: GeoJsonBBox;
    geometry: {
        type: string;
        coordinates: GeoJsonLngLat | GeoJsonLngLat[] | GeoJsonLngLat[][];
    }
    properties?: {
        farmId?: string;
        city?: string;
        state?: string;
        area?: number;
    }
}
export type I18n = <TargetKey>(key: TargetKey) => any;