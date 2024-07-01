'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { ComponentProps } from '@/typing/props';
import { ReportData } from '@/typing/types';
import { useTokenContext } from './TokenContext';
import { dummyReportData } from '@/utils/data';

function useReportData(token: string | null) {
  const searchParams = useSearchParams();
  const [userData, setReportData] = useState<ReportData | null | undefined>(
    undefined
  );
  const oid: string | null = searchParams.get('oid');

  useEffect(() => {
    if (!oid) return;
    if (token) {
      setReportData(dummyReportData[oid]);
    } else {
      setReportData(null);
    }
  }, [token, setReportData, oid]);

  return userData;
}
const ReportDataContext = createContext<ReportData | null | undefined>(
  undefined
);
export function ReportDataProvider(props: ComponentProps) {
  const { children } = props;
  const token = useTokenContext();
  const reportData = useReportData(token);
  return (
    <ReportDataContext.Provider value={reportData}>
      {children}
    </ReportDataContext.Provider>
  );
}

export const useReportDataContext = () => useContext(ReportDataContext);
