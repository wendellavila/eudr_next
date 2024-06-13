'use client';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { CopyrightText } from '@/components/CopyrightText';
import { ReportData } from '@/typing/types';

import { dummyReportData } from '@/utils/data';
import { SuppliersList } from './(components)/SuppliersList';
import { OrderDetails } from './(components)/OrderDetails';
import { ReportNavbar } from './(components)/ReportNavbar';

export default function ReportPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = useParams().lang;

  const oid: string | null = searchParams.get('oid');
  const [token, setToken] = useState<string | null>(null);
  const [reportData, setReportData] = useState<ReportData | undefined | null>(
    undefined
  );

  useEffect(() => {
    const retrievedToken: string | null =
      localStorage.getItem('token') ?? sessionStorage.getItem('token');

    if (retrievedToken) {
      setToken(retrievedToken);
    } else {
      const searchParams = new URLSearchParams();
      if (oid) {
        searchParams.set('redirect', oid);
      }
      router.replace(`/${lang}?${searchParams}`);
    }

    if (!oid) {
      router.replace(`/${lang}/orders`);
    } else {
      /*
      (async () => {
        const response = await fetch('https://...');
        if(response.ok){
          // Hydrate page
          const jsonData = await response.json();
          setReportData(jsonData as ReportData);
        }
        else if(response.status > 400 && response.status < 500){
          // If request is unauthorized or not found, go back to home
          router.replace(`/${lang}/orders`);
        }
        else {
          // Show error message
          setReportData(null);
        }
      })().catch(() => setReportData(null));
      */
      setReportData(dummyReportData[oid]);
    }
  }, [router, oid, lang]);

  return (
    <Suspense>
      <div className="flex flex-col h-[100vh] bg-surface">
        <ReportNavbar reportData={reportData} />
        <main id="report" className="grow">
          <Scrollbars universal>
            <div className="flex flex-col h-full">
              <div className="grow">
                <OrderDetails reportData={reportData} />
                <SuppliersList reportData={reportData} />
              </div>
              <CopyrightText className="mt-4 mb-2" />
            </div>
          </Scrollbars>
        </main>
      </div>
    </Suspense>
  );
}
