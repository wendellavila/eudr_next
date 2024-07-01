'use client';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { OrdersLoader } from './(components)/OrdersLoader';
import { useTokenContext } from '@/context/TokenContext';
import { UserDataProvider } from '@/context/UserDataContext';

export function ClientOrdersPage() {
  const token = useTokenContext();

  const [component, setComponent] = useState<React.ReactNode>(
    <LoadingScreen />
  );
  useEffect(() => {
    if (token)
      setComponent(
        <UserDataProvider>
          <OrdersLoader />
        </UserDataProvider>
      );
  }, [token]);

  return component;
}
