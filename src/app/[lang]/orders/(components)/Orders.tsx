'use client';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { OrderData } from '@/typing/types';
import { dummyOrders } from '@/utils/data';
import { OrdersList } from './OrdersList';
import { OrdersListFilters } from './OrdersListFilters';

export function Orders() {
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

  const [ordersData, setOrdersData] = useState<OrderData[] | undefined | null>(
    undefined
  );

  useEffect(() => {
    /*
    (async () => {
      
      const response = await fetch('https://...');
      if(response.ok){
        // Hydrate page
        const jsonData = await response.json();
        setOrdersData(jsonData.orders as OrderData[]);
      }
      else {
        // Show error message
        setOrdersData(null);
      }
      
    })().catch(console.error);
    */
    setOrdersData(dummyOrders);
  }, []);

  useEffect(() => {
    if (ordersData && ordersData.length > 0) {
      let minVolume: number = ordersData[0].volume;
      let maxVolume: number = ordersData[0].volume;
      let minDate: string = ordersData[0].date;
      let maxDate: string = ordersData[0].date;

      for (const order of ordersData.slice(1)) {
        if (order.volume < minVolume) minVolume = order.volume;
        if (order.volume > maxVolume) maxVolume = order.volume;
        if (parseInt(order.date) > parseInt(maxDate)) maxDate = order.date;
        if (parseInt(order.date) < parseInt(minDate)) minDate = order.date;
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
  }, [ordersData]);

  return (
    <div className="flex flex-col items-center px-4 h-full">
      <div className="max-w-[1200px] w-full grow">
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
        />
        <OrdersList
          ordersData={ordersData}
          minDate={minDate}
          maxDate={maxDate}
          minVolume={minVolume}
          maxVolume={maxVolume}
          searchText={searchText}
        />
      </div>
    </div>
  );
}
