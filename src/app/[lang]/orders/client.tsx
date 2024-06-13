'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CopyrightText } from '@/components/CopyrightText';
import { Orders } from './(components)/Orders';
import { HomeNavbar } from './(components)/HomeNavbar';
import Scrollbars from 'react-custom-scrollbars-2';

export function ClientOrdersPage() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const lang = useParams().lang;
  const customerName = 'Customer Name';

  useEffect(() => {
    const retrievedToken: string | null =
      localStorage.getItem('token') ?? sessionStorage.getItem('token');
    if (retrievedToken) {
      setToken(retrievedToken);
    } else {
      router.replace(`/${lang}`);
    }
  }, [lang, token, router]);

  return token ? (
    <div className="flex flex-col h-[100vh] bg-surface">
      <HomeNavbar customerName={customerName} />
      <main className="grow">
        <Scrollbars universal>
          <div className="flex flex-col h-full">
            <div className="grow">
              <Orders />
            </div>
            <CopyrightText className="mt-4 mb-2" />
          </div>
        </Scrollbars>
      </main>
    </div>
  ) : (
    <LoadingScreen id="orders-loading" />
  );
}
