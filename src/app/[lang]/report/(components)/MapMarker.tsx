'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { Iconify } from '@/components/Iconify';
import { archivo, rubik } from '@/config/fonts';
import { LatLng } from '@/typing/types';

interface MapMarkerProps {
  farmId: string;
  city: string;
  state: string;
  area: number;
  center: LatLng;
}

export function MapMarker(props: MapMarkerProps) {
  const { center, farmId, state, city, area } = props;
  const i18n = useTranslations('reportPage.labels.geolocationPanel');
  const [isMarkerInfoOpen, setMarkerInfoOpen] = useState<boolean>(false);

  return (
    <Marker
      clickable={true}
      position={center}
      title={i18n('title')}
      onClick={() => {
        setMarkerInfoOpen(true);
      }}
    >
      {isMarkerInfoOpen && (
        <InfoWindow
          position={center}
          onCloseClick={() => {
            setMarkerInfoOpen(false);
          }}
        >
          <article id="" className={`py-2 px-1 ${archivo.className}`}>
            <div className="mb-1 break-words">
              <span className="font-bold">{i18n('farmId')}: </span>
              {farmId}
            </div>
            <div className="mb-1">
              <span className="font-bold">{i18n('city')}: </span>
              <span>{city}</span>
            </div>
            <div className="mb-1">
              <span className="font-bold">{i18n('state')}: </span>
              {state}
            </div>
            <div className="text-blue">
              <span className="font-bold">{i18n('area')}: </span>
              {area}
            </div>
            <div className="mt-2 text-blue-600 flex flex-row items-center">
              <Iconify icon="mdi:map" width={15} className="mr-1" />
              <a
                target="_blank"
                className={rubik.className}
                href={`https://google.com/maps/place/${center.lat},${center.lng}`}
              >
                {i18n('viewOnMaps')}
              </a>
            </div>
          </article>
        </InfoWindow>
      )}
    </Marker>
  );
}
