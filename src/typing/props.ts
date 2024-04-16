import { ReactNode } from 'react';
import { 
    GeoJsonLngLat,I18n,OrderData,ProtocolData,ReportData,SetState,SupplierData
} from './types';

export interface TabPanelProps {
    value: number;
    index: number;
    children: ReactNode;
}

export interface ReportDataProps {
    reportData?: ReportData | null;
}

export interface ExportFileMenuProps {
    data: ReportData | SupplierData;
    mapRef?: React.RefObject<HTMLDivElement>;
    title?: string;
    selectedExportOption: HTMLElement | null;
    setSelectedExportOption: SetState<HTMLElement | null>;
    formats?: {
        excel: boolean;
        geoJson: boolean;
        kml: boolean;
        jpg: boolean;
    }
    isoDate?: string;
}

export interface SupplierTabsProps extends SupplierDataProps {
    mapRef: React.RefObject<HTMLDivElement>;
}


export interface SupplierDataProps {
    supplierData: SupplierData;
}

export interface GeolocationTabProps {
    id? : string;
    farmId: string;
    coordinates: GeoJsonLngLat[];
    city: string;
    state: string;
    area: number;
    mapRef: React.RefObject<HTMLDivElement>;
}

export interface ProtocolTabProps {
    id?: string;
    lastUpdate: string;
    protocolData: ProtocolData[];
}

export interface CardHeaderProps {
    title: string;
    icon?: ReactNode;
    actions?: ReactNode;
}

export interface OrdersListFiltersProps {
    minDate: string;
    maxDate: string;
    minDateLimit: string;
    maxDateLimit: string;
    minVolume: number;
    maxVolume: number;
    minVolumeLimit: number;
    maxVolumeLimit: number;
    searchText: string;
    setMinDate: SetState<string>;
    setMaxDate: SetState<string>;
    setMinVolume: SetState<number>;
    setMaxVolume: SetState<number>;
    setMaxVolumeLimit: SetState<number>;
    setSearchText: SetState<string>;
}

export interface OrdersListProps {
    ordersData?: OrderData[] | null;
    searchText: string;
    minDate: string;
    maxDate: string;
    minVolume: number;
    maxVolume: number;
}

export interface ChangePasswordModalProps {
    isPasswordModalOpen: boolean;
    setPasswordModalOpen: SetState<boolean>;
}

export interface NavbarDrawerProps {
    customerName: string;
    isDrawerOpen: boolean;
    setDrawerOpen: SetState<boolean>;
}

export interface NavbarProps {
    titleAppend?: string | undefined;
    i18n: I18n;
    drawer?: ReactNode;
    setDrawerOpen?: SetState<boolean>;
}

export interface InViewProps {
    viewCount: number;
    setViewCount: SetState<number>;
    ref: React.LegacyRef<HTMLSelectElement> | undefined;
}

interface ListRowLinkProps extends Props {
    href: string;
};

interface ListRowPanelProps extends ListRowNoActionProps {
    panel: ReactNode;
    isOpen: boolean;
    setPanelState: SetState<boolean>;
};

interface ListRowNoActionProps extends Props {
    component?: 'div' | 'article' | 'section';
}

export type ListRowProps = ListRowNoActionProps | ListRowPanelProps | ListRowLinkProps;

export interface SkeletonLoaderProps extends Props {
    width?: number;
    height?: number;
}

export interface ListRowErrorMessageProps {
    id?: string;
    message: string;
    type: 'alert' | 'error';
}

export interface SkeletonLoaderProps extends Props {
    width?: number;
    height?: number;
}

export interface Props {
    id?: string;
    children?: ReactNode;
};