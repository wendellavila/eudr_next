'use client';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useTokenContext } from '../../../context/TokenContext';
import { SettingsLoader } from './(components)/SettingsLoader';
import { UserDataProvider } from '@/context/UserDataContext';

export function ClientSettingsPage() {
  const token = useTokenContext();

  const [component, setComponent] = useState<React.ReactNode>(
    <LoadingScreen />
  );

  useEffect(() => {
    if (token)
      setComponent(
        <UserDataProvider>
          <SettingsLoader />
        </UserDataProvider>
      );
  }, [token]);

  return component;
}
