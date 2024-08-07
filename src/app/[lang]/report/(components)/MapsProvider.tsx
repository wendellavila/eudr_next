'use client';
import { ComponentProps } from '@/typing/props';
import { useJsApiLoader } from '@react-google-maps/api';

export function MapsProvider(props: ComponentProps) {
  const { children } = props;
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY ?? '';

  useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    version: '3.55',
    // fixing nonce ensures only one API load; further calls with the same nonce will be skipped.
    nonce: 'mapsloader',
  });

  return children;
}
