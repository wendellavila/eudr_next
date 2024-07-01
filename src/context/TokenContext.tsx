'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ComponentProps } from '@/typing/props';

type TokenData = {
  token: string | null;
};
function getStorageToken() {
  if (typeof window !== 'undefined') {
    return (
      localStorage.getItem('eudr_auth_token') ??
      sessionStorage.getItem('eudr_auth_token')
    );
  }
  return null;
}
function useStorageToken() {
  const [token, setToken] = useState(getStorageToken());

  useEffect(() => {
    function handleStorageUpdate() {
      setToken(getStorageToken());
    }
    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);
  return token;
}

function useToken() {
  const router = useRouter();
  const lang = useParams().lang;
  const token = useStorageToken();
  useEffect(() => {
    if (!token) router.replace(`/${lang}`);
  }, [lang, token, router]);
  return token;
}
export function TokenProvider(props: ComponentProps) {
  const { children } = props;
  const token = useToken();
  return (
    <TokenContext.Provider value={{ token: token }}>
      {children}
    </TokenContext.Provider>
  );
}

function useTokenReportPage() {
  const router = useRouter();
  const lang = useParams().lang;
  const token = useStorageToken();
  const searchParams = useSearchParams();
  const oid: string | null = searchParams.get('oid');
  useEffect(() => {
    if (!token) {
      const searchParams = new URLSearchParams();
      if (oid) {
        searchParams.set('oid', oid);
      }
      router.replace(`/${lang}?${searchParams}`);
    } else if (!oid) {
      router.replace(`/${lang}/orders`);
    }
  }, [lang, token, router]);
  return token;
}
export function TokenProviderReportPage(props: ComponentProps) {
  const { children } = props;
  const token = useTokenReportPage();
  return (
    <TokenContext.Provider value={{ token: token }}>
      {children}
    </TokenContext.Provider>
  );
}

const TokenContext = createContext<TokenData>({ token: null });
export const useTokenContext = () => useContext(TokenContext).token;
