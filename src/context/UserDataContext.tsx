'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ComponentProps } from '@/typing/props';

import { UserData } from '@/typing/types';
import { useTokenContext } from './TokenContext';
import { dummyUserData } from '@/utils/data';

function useUserData(token: string | null) {
  const [userData, setUserData] = useState<UserData | null | undefined>();

  useEffect(() => {
    if (token) {
      setUserData(dummyUserData);
    } else {
      setUserData(null);
    }
  }, [token, setUserData]);

  return userData;
}

const UserDataContext = createContext<UserData | null | undefined>(undefined);

export function UserDataProvider(props: ComponentProps) {
  const { children } = props;
  const token = useTokenContext();
  const userData = useUserData(token);
  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserDataContext = () => useContext(UserDataContext);
