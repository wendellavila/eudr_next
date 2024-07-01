'use client';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Card, Tabs, Tab } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { TabPanel } from '@/components/TabPanel';
import { SupplierDataProps } from '@/typing/props';
import { ProtocolTab } from './ProtocolTab';
import { GeolocationTab } from './GeolocationTab';
import { ExportFileMenu } from './ExportFileMenu/ExportFileMenu';

interface SupplierTabsProps extends SupplierDataProps {
  mapRef: React.RefObject<HTMLDivElement>;
}

export function SupplierTabs(props: SupplierTabsProps) {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const i18n = useTranslations('reportPage.labels.suppliersList');

  const { supplierData, mapRef } = props;

  const [selectedExportReportsOption, setSelectedExportReportsOption] =
    useState<null | HTMLElement>(null);

  const [selectedExportCoordinatesOption, setSelectedExportCoordinatesOption] =
    useState<null | HTMLElement>(null);

  const onExportReportsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedExportReportsOption(event.currentTarget);
  };

  const onExportCoordinatesMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedExportCoordinatesOption(event.currentTarget);
  };

  const memoizedProtocolTab = useMemo(
    () => (
      <ProtocolTab
        id={`report-${encodeURI(
          supplierData.farmId + supplierData.supplierName
        )}`}
        lastUpdate={supplierData.lastUpdate}
        protocolData={supplierData.protocol}
      />
    ),
    [
      supplierData.farmId,
      supplierData.supplierName,
      supplierData.lastUpdate,
      supplierData.protocol,
    ]
  );
  const memoizedGeolocationTab = useMemo(
    () => (
      <GeolocationTab
        id={`geolocation-${encodeURI(
          supplierData.farmId + supplierData.supplierName
        )}`}
        farmId={supplierData.farmId}
        city={supplierData.city}
        state={supplierData.state}
        area={supplierData.area}
        coordinates={supplierData.coordinates}
        mapRef={mapRef}
      />
    ),
    [
      supplierData.farmId,
      supplierData.supplierName,
      supplierData.city,
      supplierData.state,
      supplierData.area,
      supplierData.coordinates,
      mapRef,
    ]
  );

  return (
    <>
      <Card>
        <Tabs
          component="nav"
          value={activeTab}
          onChange={(_, newIndex) => setActiveTab(newIndex)}
          variant="fullWidth"
          sx={{
            '.MuiTabs-scroller': {
              height: 42,
            },
          }}
        >
          <Tab
            label={
              <div className="flex flex-row items-center">
                <Iconify
                  icon="mingcute:leaf-fill"
                  width={18}
                  className="pr-1"
                />
                {i18n('deforestationReports')}
              </div>
            }
            className="py-0"
          />
          <Tab
            label={
              <div className="flex flex-row items-center">
                <Iconify icon="ph:map-pin-fill" width={18} className="pr-1" />
                {i18n('geolocation')}
              </div>
            }
            className="py-0 min-h-0"
          />
        </Tabs>
        <TabPanel index={0} value={activeTab}>
          {memoizedProtocolTab}
        </TabPanel>
        <TabPanel index={1} value={activeTab}>
          {memoizedGeolocationTab}
        </TabPanel>
      </Card>
      <div className="flex flex-row justify-end mt-4 gap-3">
        <Button
          variant="contained"
          color="buttonWhite"
          onClick={onExportReportsMenuClick}
        >
          <Iconify icon="mdi:download" width={18} className="mr-2" />
          {i18n('exportReports')}
        </Button>
        <ExportFileMenu
          data={supplierData}
          formats={{
            excel: true,
            geoJson: false,
            kml: false,
            jpg: false,
          }}
          selectedExportOption={selectedExportReportsOption}
          setSelectedExportOption={setSelectedExportReportsOption}
        />
        <Button
          variant="contained"
          color="buttonWhite"
          onClick={onExportCoordinatesMenuClick}
        >
          <Iconify icon="mdi:download" width={18} className="mr-2" />
          {i18n('exportCoordinates')}
        </Button>
        <ExportFileMenu
          data={supplierData}
          formats={{
            excel: false,
            geoJson: true,
            kml: true,
            jpg: true,
          }}
          mapRef={mapRef}
          selectedExportOption={selectedExportCoordinatesOption}
          setSelectedExportOption={setSelectedExportCoordinatesOption}
        />
      </div>
    </>
  );
}
