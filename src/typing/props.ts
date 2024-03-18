import { ReactNode } from 'react';
import { FarmGeolocationData,OrderInfo } from './types';

export interface MapViewerProps {
    farmData: FarmGeolocationData;
}

export interface CardHeaderProps {
    title: string;
    icon: ReactNode;
}

export interface OrdersListTableProps {
    orderRows: OrderInfo[];
    searchText: string;
    minDate: string;
    maxDate: string;
    minVolume: number;
    maxVolume: number;
}

export interface ChangePasswordModalProps {
    isPasswordModalOpen: boolean;
    setPasswordModalOpen: (isPasswordModalOpen: boolean) => void;
}

export interface NavbarDrawerProps {
    isDrawerOpen: boolean;
    setDrawerOpen: (isDrawerOpen: boolean) => void;
}

export interface NavbarProps {
    title: string;
    drawerContent: ReactNode;
}

export interface InViewProps {
    viewCount: number;
    setViewCount: (viewCount: number) => void;
    ref: React.LegacyRef<HTMLSelectElement> | undefined;
}

export interface Props {
    children: ReactNode;
};