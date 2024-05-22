import { ReportData, SupplierData } from './types';

export interface ReportDataProps {
  reportData?: ReportData | null;
}

export interface SupplierDataProps {
  supplierData: SupplierData;
}

export interface ComponentProps {
  id?: string;
  children?: React.ReactNode;
  className?: string;
}
