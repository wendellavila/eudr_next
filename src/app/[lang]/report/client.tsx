'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { LoadingScreen } from '@/components/LoadingScreen';
import { ReportLoader } from './(components)/ReportLoader';
import { useTokenContext } from '@/context/TokenContext';
import { UserDataProvider } from '@/context/UserDataContext';
import { ReportDataProvider } from '@/context/ReportDataContext';

export function ClientReportPage() {
  const searchParams = useSearchParams();
  const oid: string | null = searchParams.get('oid');
  const token = useTokenContext();

  const [component, setComponent] = useState<React.ReactNode>(
    <LoadingScreen />
  );

  useEffect(() => {
    if (token && oid)
      setComponent(
        // Suspense is required when using useSearchParams
        <Suspense>
          <UserDataProvider>
            <ReportDataProvider>
              <ReportLoader />
            </ReportDataProvider>
          </UserDataProvider>
        </Suspense>
      );
  }, [token, oid]);

  return component;
}
