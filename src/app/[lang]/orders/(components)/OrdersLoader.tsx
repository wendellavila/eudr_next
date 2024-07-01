'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dayjs from 'dayjs';
import Scrollbars from 'react-custom-scrollbars-2';
import { baseUrl } from '@/utils/constants';
import { CopyrightText } from '@/components/CopyrightText';
import { OrdersNavbar } from './OrdersNavbar';
import { OrdersList } from './OrdersList';
import { OrdersListFilters } from './OrdersListFilters';
import { UserProfile } from '@/components/UserProfile';
import { OrderData, UserData } from '@/typing/types';
import { useTokenContext } from '@/context/TokenContext';
import { useUserDataContext } from '@/context/UserDataContext';
import { dummyOrders } from '@/utils/data';

export function OrdersLoader() {
  const router = useRouter();
  const lang = useParams().lang;
  // Filter states
  const [minDateLimit, setMinDateLimit] = useState<string>(
    dayjs().format('YYYYMMDD')
  );
  const [maxDateLimit, setMaxDateLimit] = useState<string>(
    dayjs().format('YYYYMMDD')
  );
  const [minDate, setMinDate] = useState<string>(minDateLimit);
  const [maxDate, setMaxDate] = useState<string>(maxDateLimit);
  const [minVolumeLimit, setMinVolumeLimit] = useState<number>(0);
  const [maxVolumeLimit, setMaxVolumeLimit] = useState<number>(0);
  const [minVolume, setMinVolume] = useState<number>(minVolumeLimit);
  const [maxVolume, setMaxVolume] = useState<number>(maxVolumeLimit);
  const [searchText, setSearchText] = useState<string>('');

  const token = useTokenContext();
  const userData = useUserDataContext();

  const orderData = dummyOrders;

  useEffect(() => {
    if (orderData && orderData.orders && orderData.orders.length > 0) {
      let minVolume: number = orderData.orders[0].volume;
      let maxVolume: number = orderData.orders[0].volume;
      let minDate: string = orderData.orders[0].date;
      let maxDate: string = orderData.orders[0].date;

      for (const orderItem of orderData.orders.slice(1)) {
        if (orderItem.volume < minVolume) minVolume = orderItem.volume;
        if (orderItem.volume > maxVolume) maxVolume = orderItem.volume;
        if (parseInt(orderItem.date) > parseInt(maxDate))
          maxDate = orderItem.date;
        if (parseInt(orderItem.date) < parseInt(minDate))
          minDate = orderItem.date;
      }
      setMinVolume(minVolume);
      setMinVolumeLimit(minVolume);

      setMaxVolume(maxVolume);
      setMaxVolumeLimit(maxVolume);

      setMinDate(minDate);
      setMinDateLimit(minDate);

      setMaxDate(maxDate);
      setMaxDateLimit(maxDate);
    }
  }, [orderData]);

  return (
    <>
      <OrdersNavbar
        className="flex lg:hidden"
        customerId={userData ? userData.customerId : undefined}
        customerName={userData ? userData.customerName : undefined}
        hideDrawer={
          userData !== null &&
          userData != undefined &&
          userData.role === 'admin'
        }
      />
      <div className="flex flex-row grow">
        <UserProfile
          card
          className="hidden lg:flex h-screen"
          customerId={userData ? userData.customerId : undefined}
          customerName={userData ? userData.customerName : undefined}
          logo={userData ? userData.logo : undefined}
          hideSettings={userData && userData.role === 'admin' ? true : false}
          hideLogout={userData && userData.role === 'admin' ? true : false}
          onHomeButton={
            userData && userData.role === 'admin'
              ? () => router.push(`/${lang}/dashboard`)
              : undefined
          }
        />
        <main className="flex flex-col grow">
          <OrdersNavbar
            className="hidden lg:flex"
            customerId={userData ? userData.customerId : undefined}
            customerName={userData ? userData.customerName : undefined}
            hideDrawer={true}
            hideBackButton={
              !userData ||
              (userData !== null &&
                userData !== undefined &&
                userData.role !== 'admin')
            }
          />
          <Scrollbars universal className="flex flex-col">
            <div className="flex flex-col px-4 lg:px-8 justify-between min-h-full">
              <div className="grow">
                <OrdersListFilters
                  minDate={minDate}
                  maxDate={maxDate}
                  minDateLimit={minDateLimit}
                  maxDateLimit={maxDateLimit}
                  minVolume={minVolume}
                  maxVolume={maxVolume}
                  minVolumeLimit={minVolumeLimit}
                  maxVolumeLimit={maxVolumeLimit}
                  searchText={searchText}
                  setMinDate={setMinDate}
                  setMaxDate={setMaxDate}
                  setMinVolume={setMinVolume}
                  setMaxVolume={setMaxVolume}
                  setMaxVolumeLimit={setMaxVolumeLimit}
                  setSearchText={setSearchText}
                  showCustomerName={
                    userData !== null &&
                    userData != undefined &&
                    userData.role === 'admin'
                  }
                />
                <OrdersList
                  ordersData={orderData ? orderData.orders : null}
                  minDate={minDate}
                  maxDate={maxDate}
                  minVolume={minVolume}
                  maxVolume={maxVolume}
                  searchText={searchText}
                  showCustomerName={
                    userData !== null &&
                    userData != undefined &&
                    userData.role === 'admin'
                  }
                />
              </div>
              <CopyrightText className="mt-4 mb-2" />
            </div>
          </Scrollbars>
        </main>
      </div>
    </>
  );
}
