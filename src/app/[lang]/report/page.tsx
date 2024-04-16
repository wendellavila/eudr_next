'use client';
import { ReactNode,useEffect,useRef,useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Button,Card,Grid,IconButton,Menu,MenuItem,Skeleton,
  Tabs,Tab,Typography,Tooltip,useMediaQuery
} from '@mui/material';
import {
  GoogleMap,InfoWindow,Marker,Polygon,useJsApiLoader
} from '@react-google-maps/api';
import { Icon } from "@iconify/react";
import { useRouter,useSearchParams,useParams } from 'next/navigation';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { archivo, rubik } from '@/config/fonts';
import { theme } from '@/config/mui-theme';
import {
  downloadGeoJSON,downloadExcel,downloadKML,formatDate,
  formatISODate,getMedianPoint,getSupplierStatus,toLatLng
} from '@/utils/functions';
import {
  CardHeader,CopyrightText,LoadingSection,ListRow,ListRowErrorMessage,
  ListRowHeader,Navbar,TabPanel,
  SkeletonLoader
} from '@/components/client';
import {
  ExportFileMenuProps,GeolocationTabProps,
  ProtocolTabProps,ReportDataProps,SupplierDataProps,SupplierTabsProps
} from '@/typing/props';
import {
  ProtocolData,ReportData,SupplierData
} from '@/typing/types';

import { dummyReportData } from '@/utils/data';

function MapViewer(props: GeolocationTabProps) : ReactNode {
  const i18n = useTranslations('reportPage.labels.geolocationPanel');
  const { isLoaded: isGoogleMapsLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY ?? '',
    version: '3.55'
  });
  const [isMarkerInfoOpen, setMarkerInfoOpen] = useState<boolean>(false);

  if(props.coordinates.length === 0){
    return (
      <div className="p-4 flex flex-row items-center">
        <Icon icon="mdi:info-outline" className="text-red-600 mr-2" width={18}/>
        <Typography>
          {i18n('geolocationNotFound')}
        </Typography>
      </div>
    );
  }

  const polygon = toLatLng(props.coordinates);
  const center = toLatLng(getMedianPoint(props.coordinates));

  const googleMap = isGoogleMapsLoaded &&
  <div ref={props.mapRef}>
    <GoogleMap
      id="map"
      mapContainerStyle={{width: '100%',minHeight: '75vh'}}
      center={center}
      zoom={13}
      mapTypeId="hybrid"
    >{<>
        <Polygon path={polygon} options={{fillColor: 'gray', strokeColor: 'white', strokeWeight: 1}}/>
        <Marker
          clickable={true}
          position={center}
          title={i18n('title')}
          onClick={()=>{setMarkerInfoOpen(true)}}
        >
          { isMarkerInfoOpen &&
            <InfoWindow
              position={center}
              onCloseClick={() => {setMarkerInfoOpen(false)}}
            >
              <article id=""className={`py-2 px-1 ${archivo.className}`}>
                <div className="mb-1 break-words">
                  <span className="font-bold">{i18n('farmId')}: </span>
                  {props.farmId}
                </div>
                <div className="mb-1">
                  <span className="font-bold">{i18n('city')}: </span>
                  <span>{props.city}</span>
                </div>
                <div className="mb-1">
                  <span className="font-bold">{i18n('state')}: </span>
                  {props.state}
                </div>
                <div className="text-blue">
                  <span className="font-bold">{i18n('area')}: </span>
                  {props.area}
                </div>
                <div className="mt-2 text-blue-600 flex flex-row items-center">
                  <Icon icon="mdi:map" width={15} className="mr-1"></Icon>
                  <a target="_blank" className={rubik.className}
                    href={
                      `https://google.com/maps/place/${center.lat},${center.lng}`
                    }
                  >
                    {i18n('viewOnMaps')}
                  </a>
                </div>
              </article>
            </InfoWindow>
          }
        </Marker>
      </>}
    </GoogleMap>
  </div>;

  return googleMap ?? <LoadingSection/>;
}

function ProtocolTab(props: ProtocolTabProps) : ReactNode {
  const i18n = useTranslations('reportPage.labels.reportsPanel');
  const lang = useParams().lang as string;
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <section id={props.id}>
      { !isSmall &&
        <ListRowHeader>
          <Grid item xs={1} lg={1} className="px-2 flex flex-col justify-center">
            <Typography variant="body2" className="font-bold break-words hyphens-auto" component="label">
              {i18n('status')}
            </Typography>
          </Grid>
          <Grid item xs={2} className="px-2 flex flex-col justify-center">
            <Typography variant="body2" className="font-bold break-words hyphens-auto" component="label">
              {i18n('name')}
            </Typography>
          </Grid>
          <Grid item xs={2} className="px-2 flex flex-col justify-center">
            <Typography variant="body2" className="font-bold break-words hyphens-auto" component="label">
              {i18n('institution')}
            </Typography>
          </Grid>
          <Grid item xs={6} lg={7} className="px-2 flex flex-col justify-center">
            <Typography variant="body2" className="font-bold break-words hyphens-auto" component="label">
              {i18n('details')}
            </Typography>
          </Grid>
        </ListRowHeader>
      }
      { props.protocolData.map(item => 
        <ListRow key={item.type} component="article">
          <Grid container rowSpacing={2}>
            <Grid item xs={3} sm={2} md={1} order={{ xs: 3, md: 1 }}
              className="px-4 md:px-2 flex flex-col md:justify-center"
            >
              {
                isSmall &&
                <Typography variant="caption" className="font-bold" component="label">
                  {i18n('status')}
                </Typography>
              }
              <Tooltip title={i18n(item.status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked')}>
                <Icon
                  icon={item.status === 'NO_ALERT' ? 'ph:seal-check-fill' : 'ph:seal-warning-fill'}
                  className={item.status === 'NO_ALERT' ? 'text-emerald-600' : 'text-red-600'}
                  width={22}
                  aria-label={i18n(item.status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked')}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={5} md={2} order={{ xs: 1, md: 2 }}
              className="px-4 md:px-2 flex flex-col md:justify-center"
            >
              {
                isSmall &&
                <Typography variant="caption" className="font-bold" component="label">
                  {i18n('name')}
                </Typography>
              }
              <Typography variant="body2" className="break-words hyphens-auto">
                {i18n(`protocolItems.${item.type}.name`)}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={5} md={2} order={{ xs: 2, md: 3 }}
              className="px-4 md:px-2 flex flex-col md:justify-center"
            >
              {
                isSmall &&
                <Typography variant="caption" className="font-bold" component="label">
                  {i18n('institution')}
                </Typography>
              }
              <Typography variant="body2" className="break-words hyphens-auto">
                {i18n(`protocolItems.${item.type}.institution`)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={7} order={{ xs: 4, md: 4 }}
              className="px-4 md:px-2 pb-2 md:pb-0 flex flex-col md:justify-center"
            >
              {
                isSmall &&
                <Typography variant="caption" className="font-bold" component="label">
                  {i18n('details')}
                </Typography>
              }
              <Typography variant="body2">
                { lang === 'pt' ? item.details : 
                  i18n(`protocolItems.${item.type}.${item.status === 'NO_ALERT' ? 'unlockedDetails' : 'lockedDetails'}`)
                  +
                  `${item.status !== 'NO_ALERT' ? `\nOriginal Details: "${item.details}"` : ''}`
                }
              </Typography>
            </Grid>
          </Grid>
        </ListRow>
      )}
      <div className="flex flex-row items-center justify-between py-3 px-4">
        <Typography variant="body2" className="mr-2">
          {i18n('lastUpdate')}:
        </Typography>
        <span className="flex flex-row items-center">
          <Icon icon="mdi:clock-outline" className="mr-[3px] mb-[1px]" width={15}/>
          <Typography variant="body2">
            {formatISODate(props.lastUpdate)}
          </Typography>
        </span>
      </div>
    </section>
  );
}

function GeolocationTab(props: GeolocationTabProps) : ReactNode {
  const i18n = useTranslations('reportPage.labels.geolocationPanel');

  return (
    <Card component="section" id={props.id}>
      <Grid container component="article">
        <Grid item xs={8} md={5}>
          <Typography variant="body2"
            className="font-bold bg-stone-100 pl-2 py-1 block
            border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            component="label"
          >
            {i18n('farmId')}
          </Typography>
          <Typography variant="body2" className="pl-2 py-3 break-all pr-3">
            {props.farmId}
          </Typography>
        </Grid>
        <Grid item xs={4} md={2}>
          <Typography variant="body2"
            className="font-bold bg-stone-100 pl-2 py-1 block
            border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            component="label"
          >
            {i18n('area')}
          </Typography>
          <Typography variant="body2" className="pl-2 py-3">
            {props.area}
          </Typography>
        </Grid>
        <Grid item xs={8} md={3}>
          <Typography variant="body2"
            className="font-bold bg-stone-100 pl-2 py-1 block
            border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            component="label"
          >
            {i18n('city')}
          </Typography>
          <Typography variant="body2" className="pl-2 py-3">
            {props.city}
          </Typography>
        </Grid>
        <Grid item xs={4} md={2}>
          <Typography variant="body2"
            className="font-bold bg-stone-100 pl-2 py-1 block
            border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            component="label"
          >
            {i18n('state')}
          </Typography>
          <Typography variant="body2" className="pl-2 py-3">
            {props.state}
          </Typography>
        </Grid>
      </Grid>
      <MapViewer {...props}/>
    </Card>
  );
}

function SupplierTabs(props: SupplierTabsProps) : ReactNode {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const i18n = useTranslations('reportPage.labels.suppliersList');

  const [
    selectedExportReportsOption,
    setSelectedExportReportsOption
  ] = useState<null | HTMLElement>(null);

  const [
    selectedExportCoordinatesOption,
    setSelectedExportCoordinatesOption
  ] = useState<null | HTMLElement>(null);

  const onExportReportsMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedExportReportsOption(event.currentTarget);
  };

  const onExportCoordinatesMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedExportCoordinatesOption(event.currentTarget);
  };

  return (
    <>
      <Card>
        <Tabs
          component="nav"
          value={activeTab}
          onChange={(_, newIndex) => setActiveTab(newIndex)}
          variant="fullWidth"
          sx={{
            ".MuiTabs-scroller": {
              height: 42
            }
          }}
        >
          <Tab
            label={
              <div className="flex flex-row items-center">
                <Icon icon="mingcute:leaf-fill" width={18} className="pr-1"/>
                {i18n('deforestationReports')}
              </div>
            }
            className="py-0"
          />
          <Tab
            label={
              <div className="flex flex-row items-center">
                <Icon icon="ph:map-pin-fill" width={18} className="pr-1"/>
                {i18n('geolocation')}
              </div>
            }
            className="py-0 min-h-0"
          />
        </Tabs>
        <TabPanel index={0} value={activeTab}>
          <ProtocolTab
            id={
              `report-${
                encodeURI(props.supplierData.farmId+props.supplierData.supplierName)
              }`
            }
            lastUpdate={props.supplierData.lastUpdate}
            protocolData={props.supplierData.protocol}
          />
        </TabPanel>
        <TabPanel index={1} value={activeTab}>
          <GeolocationTab
            id={
              `geolocation-${
                encodeURI(props.supplierData.farmId+props.supplierData.supplierName)
              }`
            }
            farmId={props.supplierData.farmId}
            city={props.supplierData.city}
            state={props.supplierData.state}
            area={props.supplierData.area}
            coordinates={props.supplierData.coordinates}
            mapRef={props.mapRef}
          />
        </TabPanel>
      </Card>
      <div className="flex flex-row justify-end mt-4 gap-3">
        <Button variant="contained" color="buttonWhite" onClick={onExportReportsMenuClick}>
          <Icon icon="mdi:download" width={18} className="mr-2"/>
          {i18n('exportReports')}
        </Button>
        <ExportFileMenu
          data={props.supplierData}
          formats={{
            excel: true,
            geoJson: false,
            kml: false,
            jpg: false
          }}
          selectedExportOption={selectedExportReportsOption}
          setSelectedExportOption={setSelectedExportReportsOption}
        />
        <Button variant="contained" color="buttonWhite" onClick={onExportCoordinatesMenuClick}>
          <Icon icon="mdi:download" width={18} className="mr-2"/>
          {i18n('exportCoordinates')}
        </Button>
        <ExportFileMenu
          data={props.supplierData}
          formats={{
            excel: false,
            geoJson: true,
            kml: true,
            jpg: true
          }}
          mapRef={props.mapRef}
          selectedExportOption={selectedExportCoordinatesOption}
          setSelectedExportOption={setSelectedExportCoordinatesOption}
        />
      </div>
    </>
  );
}



function ExportFileMenu(props: ExportFileMenuProps) : ReactNode {
  const lang = useParams().lang as string;

  let isoDate = props.isoDate;
  // data typeof ReportData
  if('suppliers' in props.data){
    isoDate = props.data.timestamp;
  }

  const onMenuClose = async (format: 'excel' | 'geojson' | 'kml' | 'jpg') => {
    props.setSelectedExportOption(null);
    if(format === 'excel'){
      downloadExcel(props.data, isoDate, lang);
    }
    else if (format === 'geojson'){
      downloadGeoJSON(props.data, isoDate);
    }
    else if (format === 'kml'){
      downloadKML(props.data, isoDate);
    }
    else if(
      format === 'jpg' &&
      'coordinates' in props.data &&
      props.mapRef &&
      props.mapRef.current){
      const { exportComponentAsJPEG } = await import('react-component-export-image');
      exportComponentAsJPEG(props.mapRef, {fileName: props.data.farmId});
    }
  };

  return (
    <Menu
      anchorEl={props.selectedExportOption}
      open={props.selectedExportOption !== null}
      onClose={onMenuClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <div className={`flex flex-col items-center pb-2 min-w-[175px] ${props.title ? '' : 'pt-2'}`}>
        { props.title &&
          <Typography variant="body2"
            className="px-4 pt-2 pb-1 font-bold text-center max-w-[200px]"
          >
            {props.title}
          </Typography>
        }
        { (!props.formats || props.formats.excel === true) &&
          <MenuItem
            className="flex flex-row justify-center w-full py-2"
            onClick={() => onMenuClose('excel')}
          >
            <Icon icon="uiw:file-excel" className="mr-3"/>
            Excel
          </MenuItem>
        }
        { (!props.formats || props.formats.geoJson === true) &&
          <MenuItem
            className="flex flex-row justify-center w-full py-2"
            onClick={() => onMenuClose('geojson')}
          >
            <Icon icon="mdi:json" className="mr-3"/>
            GeoJSON
          </MenuItem>
        }
        { (!props.formats || props.formats.kml === true) &&
          <MenuItem
            className="flex flex-row justify-center w-full py-2"
            onClick={() => onMenuClose('kml')}
          >
            <Icon icon="mdi:xml" className="mr-3"/>
            KML
          </MenuItem>
        }
        { (!props.formats || props.formats.jpg === true) &&
        props.mapRef &&
        props.mapRef.current &&
          <MenuItem
            className="flex flex-row justify-center w-full py-2"
            onClick={() => onMenuClose('jpg')}
          >
            <Icon icon="mdi:image-outline" className="mr-3"/>
            Image
          </MenuItem>
        }
      </div>
    </Menu>
  );
}

function SupplierListRow(props: SupplierDataProps) : ReactNode {
  const supplier = props.supplierData;
  const [ isOpen, setOpen ] = useState<boolean>(false);
  const i18n = useTranslations('reportPage.labels');
  const status = getSupplierStatus(supplier);
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <ListRow
      component="article"
      key={`${supplier.supplierName}-${supplier.farmId}`}
      panel={<SupplierTabs supplierData={supplier} mapRef={mapRef}/>}
      isOpen={isOpen}
      setPanelState={setOpen}
    >
      <Grid container>
        <Grid item xs={2} md={1} className="px-2 flex flex-col justify-center">
          <Tooltip title={i18n(`suppliersList.${status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked'}`)}>
            <Icon
              icon={status === 'NO_ALERT' ? 'ph:seal-check-fill' : 'ph:seal-warning-fill'}
              className={status === 'NO_ALERT' ? 'text-emerald-600' : 'text-red-600'}
              width={22}
              aria-label={i18n(`suppliersList.${status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked'}`)}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={4} md={5} className="px-2 flex flex-col justify-center">
          <Typography variant="body2">
            {supplier.supplierName}
          </Typography>
        </Grid>
        <Grid item xs={5} className="px-2 flex flex-col justify-center">
          <Typography variant="body2" className="break-words">
            {supplier.farmId}
          </Typography>
        </Grid>
        <Grid item xs={1} className="px-2 flex flex-col justify-center items-end">
          <Tooltip title={i18n(`suppliersList.${isOpen ? 'close' : 'expand'}`)}>
            <Icon icon="mdi:chevron-down" width={30} className={
              `text-neutral-600 ${isOpen ? 'rotate-180' : 'rotate-0'}`
            }/>
          </Tooltip>
        </Grid>
      </Grid>
    </ListRow>
  );
}

function SuppliersList(props: ReportDataProps) : ReactNode {
  const i18n = useTranslations('reportPage.labels');
  const isMediumOrLower = useMediaQuery(theme.breakpoints.down('lg'));

  const [ selectedExportOption, setSelectedExportOption ] = useState<null | HTMLElement>(null);
  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedExportOption(event.currentTarget);
  };

  useEffect(() => {
    const sortSuppliersByStatusAndName = (a: SupplierData, b: SupplierData) => {
      if(getSupplierStatus(a) === 'HIGH' && getSupplierStatus(b) !== 'HIGH'){
        return -1;
      }
      if(getSupplierStatus(b) === 'HIGH' && getSupplierStatus(a) !== 'HIGH'){
        return 1;
      }
      if(getSupplierStatus(a) === getSupplierStatus(b)){
        return a.supplierName.localeCompare(b.supplierName);
      }
      return 0;
    };
  
    const sortReportsByStatusAndName = (a: ProtocolData, b: ProtocolData) => {
      if(a.status === 'HIGH' && b.status !== 'HIGH') return -1;
      if(b.status === 'HIGH' && a.status !== 'HIGH') return 1;
      if(a.status === b.status){
        return i18n(
          `reportsPanel.protocolItems.${a.type}.name`
        ).localeCompare(
          i18n(`reportsPanel.protocolItems.${b.type}.name`)
        );
      }
      return 0;
    };
    if(props.reportData){
      props.reportData.suppliers.forEach(
        supplier => supplier.protocol.sort(sortReportsByStatusAndName)
      );
      props.reportData.suppliers.sort(sortSuppliersByStatusAndName);
    }
  }, [props.reportData, i18n]);

  return (
    <section id="suppliers-list" className="p-4 flex flex-col items-center">
      <Card className="max-w-[1200px] w-full">
        <CardHeader
          icon={
            <Icon icon="ic:round-agriculture" width={31} className="mr-2"/>
          }
          title={i18n('suppliersList.title')}
          actions={
            props.reportData &&
            <Tooltip title={i18n('suppliersList.exportAllSuppliers')}>
              <IconButton onClick={onMenuClick} className="px-0 py-1">
                <Icon icon="mdi:download" className="text-white"/>
              </IconButton>
            </Tooltip>
          }
        />
        { props.reportData &&
          <ExportFileMenu
            title={i18n('suppliersList.exportAllSuppliers')}
            data={props.reportData}
            selectedExportOption={selectedExportOption}
            setSelectedExportOption={setSelectedExportOption}
            formats={{
              excel: true,
              geoJson: true,
              kml: true,
              jpg: false
            }}
          />
        }
        <ListRowHeader>
          <Grid item xs={2} md={1} className="px-2 flex flex-col justify-center">
            <Typography variant="body2" className="font-bold break-words hyphens-auto">
              {i18n('suppliersList.status')}
            </Typography>
          </Grid>
          <Grid item xs={4} md={5} className="px-2 flex flex-col justify-center">
            <Typography variant="body2" className="font-bold break-words hyphens-auto">
              {i18n('suppliersList.supplierName')}
            </Typography>
          </Grid>
          <Grid item xs={5} className="px-2 flex flex-col justify-center">
            <Typography variant="body2" className="font-bold break-words hyphens-auto">
              {i18n('suppliersList.farmId')}
            </Typography>
          </Grid>
        </ListRowHeader>
        { props.reportData && props.reportData.suppliers.length > 0 &&
          props.reportData.suppliers.map(
            supplier =>
            <SupplierListRow
              key={`${supplier.supplierName}-${supplier.farmId}`}
              supplierData={supplier}
            />
          )
        }
        { props.reportData === undefined && 
          <article id="suppliers-loading" className="py-2">
            <Grid container>
              <Grid item xs={2} md={1} className="px-2 flex flex-col justify-center">
                <Skeleton width={25}/>
              </Grid>
              <Grid item xs={4} md={5} className="px-2 flex flex-col justify-center">
                <Skeleton width={isMediumOrLower ? '90%' : '80%'}/>
                <Skeleton width={'60%'}/>
              </Grid>
              <Grid item xs={6} className="px-2 flex flex-col justify-center">
                <Skeleton width={isMediumOrLower ? '60%' : '50%'}/>
                <Skeleton width={isMediumOrLower ? '90%' : '70%'}/>
              </Grid>
            </Grid>
          </article>
        }
        { props.reportData === null &&
          <ListRowErrorMessage
            id="suppliers-error"
            message={i18n('suppliersList.noSuppliersError')}
            type="error"
          />
        }
      </Card>
    </section>
  );
}

function OrderDetails(props: ReportDataProps) : ReactNode {
  const i18n = useTranslations('reportPage.labels.orderDetails');

  const status = props.reportData && props.reportData.suppliers.filter(
    supplier => supplier.protocol.filter(
      protocolItem => protocolItem.status !== 'NO_ALERT'
    ).length > 0
  ).length > 0 ? 'HIGH' : 'NO_ALERT';

  return (
    <section id="order-details" className="p-4 flex flex-col items-center">
      <Card className="max-w-[1200px] w-full">
        <CardHeader
          title={i18n('title')}
          icon={
            <Icon icon="material-symbols:order-approve" width={28} className="mr-2"/>
          }
        />
        { (props.reportData || props.reportData === undefined) &&
          <Grid container>
            <Grid item xs={5} md={4}>
              <Typography variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1
                border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
              >
                {i18n('orderNumber')}
              </Typography>
              <SkeletonLoader width={100}>
                { props.reportData ? 
                  <Typography variant="body2">
                    {props.reportData.orderNumber}
                  </Typography>
                 : undefined }
              </SkeletonLoader>
            </Grid>
            <Grid item xs={5} md={2}>
              <Typography variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1
                border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
              >
                {i18n('date')}
              </Typography>
              <SkeletonLoader width={80}>
                { props.reportData ? 
                  <Typography variant="body2">
                    {formatDate(props.reportData.orderDate)}
                  </Typography> : undefined
                }
              </SkeletonLoader>
            </Grid>
            <Grid item xs={2} md={2}>
              <Typography variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1
                border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
              >
                {i18n('volume')}
              </Typography>
              <SkeletonLoader width={70}>
                { props.reportData ? 
                  <Typography variant="body2">
                    {props.reportData.volume}
                  </Typography> : undefined
                }
              </SkeletonLoader>
            </Grid>
            <Grid item xs={5} md={3}>
              <Typography variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
                border-b-[1px] border-x-0 xs:border-t-[1px] md:border-t-0"
              >
                {i18n('supplierNumber')}
              </Typography>
              <SkeletonLoader width={50}>
                { props.reportData ? 
                  <Typography variant="body2">
                    {props.reportData.suppliers.length}
                  </Typography> : undefined 
                }
              </SkeletonLoader>
            </Grid>
            <Grid item xs={7} md={1}>
              <Typography variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
                border-b-[1px] border-x-0 xs:border-t-[1px] md:border-t-0"
              >
                {i18n('status')}
              </Typography>
              <SkeletonLoader width={25}>
                { props.reportData ? 
                  <Tooltip
                    title={i18n(status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked')}>
                    <Icon
                      icon={status === 'NO_ALERT' ? 'ph:seal-check-fill' : 'ph:seal-warning-fill'}
                      className={status === 'NO_ALERT' ? 'text-emerald-600' : 'text-red-600'}
                      width={22}
                      aria-label={i18n(status === 'NO_ALERT' ? 'statusUnlocked' : 'statusLocked')}
                    />
                  </Tooltip>
                  : undefined
                }
              </SkeletonLoader>
            </Grid>
          </Grid>
        }
        { props.reportData === null &&
          <ListRowErrorMessage
            id="report-error"
            message={i18n('noOrderDetailsError')}
            type="error"
          />
        }
      </Card>
    </section>
  );
}

function ReportNavbar(props: ReportDataProps){
  const i18n = useTranslations('reportPage.labels.navbar');
  return (
    <Navbar
      titleAppend={props.reportData ? props.reportData.orderNumber : undefined}
      i18n={i18n}
    />
  );
}

export default function ReportPage() : ReactNode {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = useParams().lang;
  
  const oid: string | null = searchParams.get("oid");
  const [ token, setToken ] = useState<string | null>(null);
  const [ reportData, setReportData ] = useState<ReportData | undefined | null>(undefined);

  useEffect(()=>{
    const retrievedToken: string | null = 
      localStorage.getItem('token') ?? sessionStorage.getItem('token');

    if(retrievedToken){
      setToken(retrievedToken);
    }
    else {
      const searchParams = new URLSearchParams();
      if(oid){
        searchParams.set("redirect", oid);
      }
      router.replace(`/${lang}?${searchParams}`);
    }
    
    if(!oid){
      router.replace(`/${lang}/home`);
    }
    else {
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
          router.replace(`/${lang}/home`);
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
  
  return(
    <div className="flex flex-col h-[100vh] bg-surface">
      <ReportNavbar reportData={reportData}/>
      <main id="report" className="grow">
        <Scrollbars universal>
          <div className="flex flex-col h-full">
            <div className="grow">
              <OrderDetails reportData={reportData}/>
              <SuppliersList reportData={reportData}/>
            </div>
            <CopyrightText className="mt-4 mb-2"/>
          </div>
        </Scrollbars>
      </main>
    </div>
  );
}