export interface OrderInfo {
    orderNumber: string;
    date: string;
    volume: number;
};

export interface SupplierData {
    supplierName: string;
    farmId: string;
    status: boolean;
};

export interface FarmGeolocationData {
    city: string;
    state: string;
    area: string;
    farmId: string;
    coordinates: {
      polygon: LatLng[];
      center: LatLng;
    }
};

export interface LatLng {
    lat: number;
    lng: number;
}