'use client';
import { useRouter, useParams } from 'next/navigation';
import { CopyrightText } from '@/components/CopyrightText';
import Scrollbars from 'react-custom-scrollbars-2';
import { SuppliersList } from './SuppliersList';
import { OrderDetails } from './OrderDetails';
import { ReportNavbar } from './ReportNavbar';
import { UserProfile } from '@/components/UserProfile';
import { useUserDataContext } from '@/context/UserDataContext';
import { useReportDataContext } from '@/context/ReportDataContext';
import { MapsProvider } from './MapsProvider';

export function ReportLoader() {
  const router = useRouter();
  const lang = useParams().lang;

  const userData = useUserDataContext();
  const reportData = useReportDataContext();

  const handleHomeButton = () => {
    if (userData && userData.role === 'admin')
      router.replace(`/${lang}/dashboard`);
    else router.replace(`/${lang}/orders`);
  };

  return (
    <>
      <ReportNavbar
        className="flex lg:hidden"
        titleAppend={reportData ? reportData.orderNumber : undefined}
      />

      <div className="flex flex-row grow bg-avocado-100">
        <UserProfile
          card
          className="hidden lg:flex h-screen"
          customerId={userData ? userData.customerId : undefined}
          customerName={userData ? userData.customerName : undefined}
          onHomeButton={handleHomeButton}
          logo={userData ? userData.logo : undefined}
          hideSettings
          hideLogout
          showOrders={userData && userData.role === 'admin' ? true : false}
        />
        <main className="flex flex-col grow">
          <ReportNavbar
            className="hidden lg:flex"
            titleAppend={reportData ? reportData.orderNumber : undefined}
          />
          <Scrollbars universal>
            <div className="flex flex-col grow px-4 lg:px-8 justify-between min-h-full">
              <div className="grow">
                <OrderDetails />
                <MapsProvider>
                  <SuppliersList />
                </MapsProvider>
              </div>
              <CopyrightText className="mt-4 mb-2" />
            </div>
          </Scrollbars>
        </main>
      </div>
    </>
  );
}
