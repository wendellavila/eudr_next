'use client';
import { ReactNode,useEffect,useMemo,useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Card,Grid,IconButton,Tabs,Tab,Typography,Tooltip
} from '@mui/material';
import {
  GoogleMap,InfoWindow,Marker,Polygon,useJsApiLoader
} from '@react-google-maps/api';
import { Icon } from "@iconify/react";
import { useRouter,useSearchParams,useParams } from 'next/navigation';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
  MaterialReactTable,useMaterialReactTable,type MRT_ColumnDef,
} from 'material-react-table';

import { archivo, rubik } from '@/config/fonts';
import { getMedianPoint,toLatLng,formatDate } from '@/utils/functions';
import { CardHeader,LoadingScreen } from '@/components/client';
import { getMaterialReactTableLocalization } from '@/config/i18n';
import { MapViewerProps } from '@/typing/props';
import { FarmGeolocationData,SupplierData } from '@/typing/types';

function MapViewer(props: MapViewerProps) : ReactNode {
  const i18n = useTranslations('reportPage.labels.geolocationPanel');

  const { isLoaded: isGoogleMapsLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY ?? '',
  });
  const [isMarkerInfoOpen, setMarkerInfoOpen] = useState(false);

  return isGoogleMapsLoaded ? 
  <GoogleMap
    mapContainerStyle={{width: '100%',minHeight: '77vh'}}
    center={props.farmData.coordinates.center}
    zoom={13}
    mapTypeId="hybrid"
  >{<>
      <Polygon path={props.farmData.coordinates.polygon} options={{fillColor: 'gray', strokeColor:'white', strokeWeight: 1}}/>
      <Marker
        clickable={true}
        position={props.farmData.coordinates.center}
        title={i18n('title')}
        onClick={()=>{setMarkerInfoOpen(true)}}
      >
        { isMarkerInfoOpen &&
          <InfoWindow
            position={props.farmData.coordinates.center}
            onCloseClick={() => {setMarkerInfoOpen(false)}}
          >
            <article id=""className={`py-2 px-1 ${archivo.className}`}>
              <div className="mb-1 break-words">
                <span className="font-bold">{i18n('farmId')}: </span>
                {props.farmData.farmId}
              </div>
              <div className="mb-1">
                <span className="font-bold">{i18n('city')}: </span>
                <span>{props.farmData.city}</span>
              </div>
              <div className="mb-1">
                <span className="font-bold">{i18n('state')}: </span>
                {props.farmData.state}
              </div>
              <div className="text-blue">
                <span className="font-bold">{i18n('area')}: </span>
                {props.farmData.area} ha
              </div>
              <div className="mt-2 text-blue-600 flex flex-row items-center">
                <Icon icon="mdi:map" width={15} className="mr-1"></Icon>
                <a target="_blank" className={rubik.className}
                  href={
                    `https://google.com/maps/place/${props.farmData.coordinates.center.lat},${props.farmData.coordinates.center.lng}`
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
  : <></>;
}

function Navbar(){
  const i18n = useTranslations('reportPage.labels.navbar');
  const router = useRouter();
  
  return (
    <Card
      component="header"
      className="px-4 py-3 flex items-center rounded-none justify-between text-foreground z-10"
    >
      <IconButton className="mr-3 text-foreground" aria-label="menu" onClick={() => router.back()}>
        <Icon icon="mdi:arrow-back" width={22}/>
      </IconButton>
      <Typography variant="h6" component="div" className="flex-grow">
        {i18n('title')}
      </Typography>
      <img
        width={66}
        height={43}
        src={`/img/logo.svg`}
        alt="Logo"
        className="inline w-auto h-[30px]"
      />
    </Card>
  );
}

type EmbargoData = {
  id: string,
  name: string,
  institution: string,
  status: boolean,
  details: string,
}

function ReportsPanel() : ReactNode {
  const i18n = useTranslations('reportPage.labels.reportsPanel');
  const lang = useParams().lang as string;
  const [ embargoRows, setEmbargoRows ] = useState<EmbargoData[]>([]);

  useEffect(() => {
    setEmbargoRows(
      ['UNIDADES_CONSERVACAO','EMBARGO_IBAMA_DOCUMENT','PRODES_ANY','EMBARGO_IBAMA','EMBARGO_ICMBIO_DOCUMENT',
      'ALERTA_MAPBIOMAS','SITUACAO_CAR','EMBARGO_SEMA','EMBARGO_SLAVERIES_DOCUMENT','QUILOMBOS','TERRAS_INDIGENAS',
      'EMBARGO_SEMA_DOCUMENT','EMBARGO_ICMBIO'].map((item)=>(
      {
        id: item,
        name: i18n(`embargoItems.${item}.name`),
        institution: i18n(`embargoItems.${item}.institution`),
        status: true,
        details: i18n(`embargoItems.${item}.unlockedDetails`)}
    )));
  }, []);

  const columns = useMemo<MRT_ColumnDef<EmbargoData>[]>(
    () => [
      {
        accessorKey: 'status',
        header: i18n('status'),
        size: 10,
        accessorFn: (row) => (
        <Tooltip title={i18n(row.status ? 'deforestationFree' : 'deforestationAlert')}>
          <Icon
            icon={row.status ? 'ph:seal-check-fill' : 'ph:seal-warning-fill'}
            className={row.status ? 'text-emerald-600' : 'text-red-600'}
            width={22}
            aria-label={i18n(row.status ? 'deforestationFree' : 'deforestationAlert')}
          />
        </Tooltip>
        )
      },
      {
        accessorKey: 'name',
        header: i18n('name'),
        size: 20,
      },
      {
        accessorKey: 'institution',
        header: i18n('institution'),
        size: 20,
      },
      {
        accessorKey: 'details',
        header: i18n('details'),
        grow: true,
        size: 50,
      },
    ],
    [i18n],
  );

  const table = useMaterialReactTable({
    columns,
    data: embargoRows,
    layoutMode: 'grid',
    localization: getMaterialReactTableLocalization(lang),
    muiPaginationProps: {
      rowsPerPageOptions: [15],
    },
    initialState: {
      pagination: { pageSize: 15, pageIndex: 0 },
      density: 'compact',
    },
    muiTableHeadCellProps: {
      className: 'bg-stone-100 py-1',
    },
    defaultColumn:{ minSize: 1, maxSize:100, size:1},
    enableColumnActions: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    
    muiTableBodyCellProps: {
      className: 'text-wrap'
    },
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
    }),
    muiTablePaperProps: {
      elevation: 0,
    },
  });

  return (
    <MaterialReactTable table={table}/>
  );
}

function GeolocationPanel() : ReactNode {
  const i18n = useTranslations('reportPage.labels.geolocationPanel');
  const points: [number, number][] = [
    [-46.752826,-21.313278],
    [-46.746829,-21.313118],
    [-46.746861,-21.318156],
    [-46.753955,-21.318502],
    [-46.752674,-21.315613],
    [-46.752826,-21.313278]
  ];

  const [ farmData,setFarmData ] = useState<FarmGeolocationData | null>(null); 

  useEffect(() => {
    setFarmData({
      city: "Guaxupé",
      state: "MG",
      area: "123.45",
      farmId: "AA-12345-00000000000000000",
      coordinates: {
        polygon: toLatLng(points),
        center: toLatLng(getMedianPoint(points))
      }
    });
  }, []);

  return (
    <section id="geolocation">
      { farmData ? 
        <Card>
          <Grid container>
            <Grid item xs={6} md={4}>
              <Typography variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1
                border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
              >
                {i18n('farmId')}
              </Typography>
              <Typography variant="body2" className="pl-2 py-3 w-full">
                {farmData.farmId}
              </Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1
                border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
              >
                {i18n('city')}
              </Typography>
              <Typography variant="body2" className="pl-2 py-3">
                {farmData.city}
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
                border-b-[1px] border-x-0 xs:border-t-[1px] md:border-t-0"
              >
                {i18n('state')}
              </Typography>
              <Typography variant="body2" className="pl-2 py-3">
                {farmData.state}
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="body2"
                className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
                border-b-[1px] border-x-0 xs:border-t-[1px] md:border-t-0"
              >
                {i18n('area')}
              </Typography>
              <Typography variant="body2" className="pl-2 py-3">
                {farmData.area}
              </Typography>
            </Grid>
          </Grid>
          <MapViewer farmData={farmData}/>
        </Card>
        :
        <div className="flex flex-row justify-center pt-6 py-4">
          <Icon icon="svg-spinners:ring-resize" width={40} className="text-primary"/>
        </div>
      }
    </section>
  );
}

function SupplierDetailsPanel() : ReactNode {
  const [activeTab, setActiveTab] = useState<number>(0);
  const i18n = useTranslations('reportPage.labels.supplierList');
  return (
    <Card>
      <Tabs
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
        <ReportsPanel/>
      </TabPanel>
      <TabPanel index={1} value={activeTab}>
        <GeolocationPanel/>
      </TabPanel>
      {/* {activeTab === 0 ? <ReportsPanel/> : <GeolocationPanel/>} */}
    </Card>
  );
}

function TabPanel(props: {value: number, index: number, children: ReactNode}) : ReactNode {
  const { children, index, value } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`supplier-info-tabpanel-${index}`}
      aria-labelledby={`supplier-info-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

function SupplierList() : ReactNode {
  const i18n = useTranslations('reportPage.labels.supplierList');
  const lang = useParams().lang as string;
  const [ supplierRows, setSupplierRows ] = useState<SupplierData[]>([]);

  useEffect(() => {
    setSupplierRows(
      [
        {supplierName: "João da Silva", farmId: "AA-12345-00000000000000000", status: true},
        {supplierName: "Maria dos Santos", farmId: "AA-12345-00000000000000001", status: false},
      ],
    );
  }, []);

  const memoizedSupplierRows = useMemo<SupplierData[]>(() => supplierRows, [supplierRows]);

  const columns = useMemo<MRT_ColumnDef<SupplierData>[]>(
    () => [
      {
        accessorKey: 'status',
        header: i18n('status'),
        size: 10,
        accessorFn: (row) => (
        <Tooltip title={i18n(row.status ? 'deforestationFree' : 'deforestationAlert')}>
          <Icon
            icon={row.status ? 'ph:seal-check-fill' : 'ph:seal-warning-fill'}
            className={row.status ? 'text-emerald-600' : 'text-red-600'}
            width={22}
            aria-label={i18n(row.status ? 'deforestationFree' : 'deforestationAlert')}
          />
        </Tooltip>
        )
      },
      {
        accessorKey: 'supplierName',
        header: i18n('supplierName'),
        size: 50
      },
      {
        accessorKey: 'farmId',
        header: i18n('farmId'),
        size: 50,
      },
    ],
    [i18n],
  );

  const table = useMaterialReactTable({
    columns,
    data: memoizedSupplierRows,
    localization: getMaterialReactTableLocalization(lang),
    muiPaginationProps: {
      rowsPerPageOptions: [15, 50, 150],
    },
    initialState: {
      pagination: { pageSize: 15, pageIndex: 0 },
      density: 'compact',
    },
    muiTableHeadCellProps: {
      className: 'bg-stone-100 py-1',
    },
    enableColumnActions: false,
    enableTopToolbar: false,
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
    }),
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: i18n('details'),
        size: 10,
      },
    },
    renderDetailPanel: ({ row }) => <SupplierDetailsPanel/>,
    enableExpandAll: false,
    positionExpandColumn: 'last',
    muiDetailPanelProps: () => ({
      className: 'bg-[#abada3]'
    }),
  });
  return (
    <section id="farm-list" className="p-4 flex flex-col items-center">
      <Card className="max-w-[1200px] w-full">
        <CardHeader
          title={i18n('title')}
          icon={
            <Icon icon="ic:round-agriculture" width={31} className="mr-2"/>
          }
        />
        <MaterialReactTable table={table}/>
      </Card>
    </section>
  );
}

function OrderDetails() : ReactNode {
  const i18n = useTranslations('reportPage.labels.orderDetails');
  const searchParams = useSearchParams();

  const orderData = {
    orderNumber: searchParams.get("oid"),
    date: '20240101',
    volume: 100,
    supplierNumber: 2,
    status: true
  }

  return (
    <section id="order-details" className="p-4 flex flex-col items-center">
      <Card className="max-w-[1200px] w-full">
        <CardHeader
          title={i18n('title')}
          icon={
            <Icon icon="material-symbols:order-approve" width={28} className="mr-2"/>
          }
        />
        <Grid container>
          <Grid item xs={5} md={4}>
            <Typography variant="body2"
              className="font-bold bg-stone-100 pl-2 py-1
              border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            >
              {i18n('orderNumber')}
            </Typography>
            <Typography variant="body2" className="pl-2 py-3 w-full">
              {searchParams.get("oid")}
            </Typography>
          </Grid>
          <Grid item xs={5} md={2}>
            <Typography variant="body2"
              className="font-bold bg-stone-100 pl-2 py-1
              border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            >
              {i18n('date')}
            </Typography>
            <Typography variant="body2" className="pl-2 py-3">
              {formatDate(orderData.date)}
            </Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography variant="body2"
              className="font-bold bg-stone-100 pl-2 py-1
              border-b-[1px] border-x-0 border-t-0 border-solid border-neutral-200"
            >
              {i18n('volume')}
            </Typography>
            <Typography variant="body2" className="pl-2 py-3">
              {orderData.volume}
            </Typography>
          </Grid>
          <Grid item xs={5} md={3}>
            <Typography variant="body2"
              className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
              border-b-[1px] border-x-0 xs:border-t-[1px] md:border-t-0"
            >
              {i18n('supplierNumber')}
            </Typography>
            <Typography variant="body2" className="pl-2 py-3">
              {orderData.supplierNumber}
            </Typography>
          </Grid>
          <Grid item xs={7} md={1}>
            <Typography variant="body2"
              className="font-bold bg-stone-100 pl-2 py-1 border-solid border-neutral-200
              border-b-[1px] border-x-0 xs:border-t-[1px] md:border-t-0"
            >
              {i18n('status')}
            </Typography>
            <Typography variant="body2" className="pl-2 py-3">
              <Tooltip title={i18n(orderData.status ? 'deforestationFree' : 'deforestationAlert')}>
                <Icon
                  icon={orderData.status ? 'ph:seal-check-fill' : 'ph:seal-warning-fill'}
                  className={orderData.status ? 'text-emerald-600' : 'text-red-600'}
                  width={22}
                  aria-label={i18n(orderData.status ? 'deforestationFree' : 'deforestationAlert')}
                />
              </Tooltip>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </section>
  );
}

export default function ReportPage() : ReactNode {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = useParams().lang;

  const oid: string | null = searchParams.get("oid");
  const [ token, setToken ] = useState<string | null>(null);

  useEffect(()=>{
    const retrievedToken: string | null = 
      localStorage.getItem('token') ?? sessionStorage.getItem('token');
    if(retrievedToken){
      setToken(retrievedToken);
    }
    else {
      router.replace(`/${lang}/`);
    }    
    if(!oid){
      router.replace(`/${lang}/home`);
    }
  }, [oid, lang, token, router]);
  
  return(
    (token && oid) ?
    <div className="flex flex-col h-[100vh] bg-surface">
      <Navbar/>
      <main className="grow">
        <Scrollbars universal>
          <OrderDetails/>
          <SupplierList/>
        </Scrollbars>
      </main>
    </div> : <LoadingScreen/>
  );
}