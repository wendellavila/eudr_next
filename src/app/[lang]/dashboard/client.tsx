'use client';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { DashboardLoader } from './(components)/DashboardLoader';
import { useTokenContext } from '@/context/TokenContext';
import { UserDataProvider } from '@/context/UserDataContext';

export function ClientDashboardPage() {
  const token = useTokenContext();

  const [component, setComponent] = useState<React.ReactNode>(
    <LoadingScreen />
  );
  useEffect(() => {
    if (token)
      setComponent(
        <UserDataProvider>
          <DashboardLoader />
        </UserDataProvider>
      );
  }, [token]);

  return component;
}
