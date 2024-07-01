import { ReportData, SupplierData } from './types';
import { UserData } from '@/typing/types';

export interface UserDataProps {
  userData?: UserData | null;
}

export interface TokenProps {
  token: string;
}

export interface ReportDataProps {
  reportData?: ReportData | null;
}

export interface SupplierDataProps {
  supplierData: SupplierData;
}

export interface BannerScrollProps {
  aboutRef: React.RefObject<HTMLElement>;
  registerRef: React.RefObject<HTMLElement>;
}

export interface ComponentProps {
  id?: string;
  children?: React.ReactNode;
  className?: string;
}
