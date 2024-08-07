'use client';
import { Menu, MenuItem, Typography } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { useParams } from 'next/navigation';
import { ReportData, SetState, SupplierData } from '@/typing/types';

import { downloadExcel } from './downloadExcel';
import { downloadGeoJson } from './downloadGeoJson';
import { downloadKML } from './downloadKML';

interface Props {
  data: ReportData | SupplierData;
  mapRef?: React.RefObject<HTMLDivElement>;
  title?: string;
  selectedExportOption: HTMLElement | null;
  setSelectedExportOption: SetState<HTMLElement | null>;
  formats?: {
    excel: boolean;
    geoJson: boolean;
    kml: boolean;
    jpg: boolean;
  };
  isoDate?: string;
}

export function ExportFileMenu(props: Props) {
  const lang = useParams().lang as string;
  const {
    data,
    mapRef,
    formats,
    title,
    selectedExportOption,
    setSelectedExportOption,
  } = props;

  let isoDate = props.isoDate;
  // data typeof ReportData
  if ('suppliers' in data) {
    isoDate = data.timestamp;
  }

  const onMenuClose = async (format: 'excel' | 'geojson' | 'kml' | 'jpg') => {
    setSelectedExportOption(null);
    if (format === 'excel') {
      downloadExcel(data, isoDate, lang);
    } else if (format === 'geojson') {
      downloadGeoJson(data, isoDate);
    } else if (format === 'kml') {
      downloadKML(data, isoDate);
    } else if (
      format === 'jpg' &&
      'coordinates' in data &&
      mapRef &&
      mapRef.current
    ) {
      const { exportComponentAsJPEG } = await import(
        'react-component-export-image'
      );
      exportComponentAsJPEG(mapRef, { fileName: data.farmId });
    }
  };

  return (
    <Menu
      anchorEl={selectedExportOption}
      open={selectedExportOption !== null}
      onClose={onMenuClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <div
        className={`flex flex-col items-center pb-2 min-w-[175px] ${
          title ? '' : 'pt-2'
        }`}
      >
        {title && (
          <Typography
            variant="body2"
            className="px-4 pt-2 pb-1 font-bold text-center max-w-[200px]"
          >
            {title}
          </Typography>
        )}
        {(!formats || formats.excel === true) && (
          <MenuItem
            className="flex flex-row justify-center w-full py-2"
            onClick={() => onMenuClose('excel')}
          >
            <Iconify icon="uiw:file-excel" className="mr-3" />
            Excel
          </MenuItem>
        )}
        {(!formats || formats.geoJson === true) && (
          <MenuItem
            className="flex flex-row justify-center w-full py-2"
            onClick={() => onMenuClose('geojson')}
          >
            <Iconify icon="mdi:json" className="mr-3" />
            GeoJSON
          </MenuItem>
        )}
        {(!formats || formats.kml === true) && (
          <MenuItem
            className="flex flex-row justify-center w-full py-2"
            onClick={() => onMenuClose('kml')}
          >
            <Iconify icon="mdi:xml" className="mr-3" />
            KML
          </MenuItem>
        )}
        {(!formats || formats.jpg === true) && mapRef && mapRef.current && (
          <MenuItem
            className="flex flex-row justify-center w-full py-2"
            onClick={() => onMenuClose('jpg')}
          >
            <Iconify icon="mdi:image-outline" className="mr-3" />
            JPG
          </MenuItem>
        )}
      </div>
    </Menu>
  );
}
