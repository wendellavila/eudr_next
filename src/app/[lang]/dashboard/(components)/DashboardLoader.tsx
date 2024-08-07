'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Scrollbars from 'react-custom-scrollbars-2';
import { DashboardNavbar } from './DashboardNavbar';
import { CopyrightText } from '@/components/CopyrightText';
import { UserProfile } from '@/components/UserProfile';

import { Grid } from '@mui/material';
import { AccountCreationLoader } from './AccountCreationLoader';
import { ViewOrders } from './ViewOrders';
import { useTokenContext } from '@/context/TokenContext';
import { useUserDataContext } from '@/context/UserDataContext';

export function DashboardLoader() {
  const router = useRouter();
  const lang = useParams().lang;

  const token = useTokenContext();
  const userData = useUserDataContext();

  useEffect(() => {
    if (token) router.prefetch(`/${lang}/orders`);
  }, [lang, router, token]);

  useEffect(() => {
    if (userData && userData.role !== 'admin') {
      router.replace(`/${lang}/orders`);
    }
  }, [lang, router, userData]);

  return (
    <>
      <DashboardNavbar
        className="flex lg:hidden"
        customerId={userData ? userData.customerId : undefined}
        customerName={userData ? userData.customerName : undefined}
      />
      <div className="flex flex-row grow bg-avocado-100">
        <UserProfile
          card
          className="hidden lg:flex h-screen"
          customerId={userData ? userData.customerId : undefined}
          customerName={userData ? userData.customerName : undefined}
          logo={userData ? userData.logo : undefined}
          showOrders
        />
        <main className="flex flex-col grow">
          <DashboardNavbar
            className="hidden lg:flex"
            hideDrawer
            customerId={userData ? userData.customerId : undefined}
            customerName={userData ? userData.customerName : undefined}
          />
          <Scrollbars universal className="flex flex-col">
            <div className=" flex flex-col px-4 lg:px-8 justify-between min-h-full">
              <div className="grow">
                <Grid container spacing={2} className="mt-2 lg:mt-4 ">
                  <Grid item xs={12} xl={4}>
                    <ViewOrders />
                  </Grid>
                  <AccountCreationLoader />
                </Grid>
              </div>
              <CopyrightText className="mt-4 mb-2" />
            </div>
          </Scrollbars>
        </main>
      </div>
    </>
  );
}
