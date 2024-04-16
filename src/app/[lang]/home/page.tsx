'use client';
import { ReactNode,useEffect,useMemo,useState } from 'react';
import Image from 'next/image';
import { useParams,useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Avatar,Box,Button,Card,Drawer,Grid,IconButton,Input,
  InputAdornment,InputLabel,List,ListItem,ListItemButton,
  Modal,TextField,Typography,Skeleton,Slider,useMediaQuery
} from '@mui/material';
import { DatePicker,LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Icon } from '@iconify/react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { enUS,ptBR } from '@mui/x-date-pickers';

import { getDayjsLocalization } from '@/config/i18n';
import { theme } from '@/config/mui-theme';
import { formatDate } from '@/utils/functions';
import {
  CardHeader,CopyrightText,LanguageSelector,LoadingScreen,ListRow,
  ListRowErrorMessage,ListRowHeader,Navbar
} from '@/components/client';
import {
  ChangePasswordModalProps,NavbarDrawerProps,
  OrdersListFiltersProps,OrdersListProps
} from '@/typing/props';
import { OrderData } from '@/typing/types';
import { dummyOrders } from '@/utils/data';

function ChangePasswordModal(props: ChangePasswordModalProps) : ReactNode {
  const i18n = useTranslations('homePage.labels.changePasswordModal');

  const [ currentPassword, setCurrentPassword ] = useState<string>('');
  const [ newPassword, setNewPassword ] = useState<string>('');
  const [ repeatNewPassword, setRepeatNewPassword ] = useState<string>('');

  const handleClose = () => props.setPasswordModalOpen(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      currentPassword: data.get('currentPassword'),
      newPassword: data.get('newPassword'),
      repeatNewPassword: data.get('repeatNewPassword'),
    });
  };

  return (
    <Modal
      open={props.isPasswordModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-col items-center"
    >
      <Card className="relative p-4 m-8 max-w-[500px] min-w-[450px]">
        <div className="absolute top-0 right-0 p-1">
          <IconButton onClick={handleClose}>
            <Icon icon="mdi:close" width={24}></Icon>
          </IconButton>
        </div>
        <div className="flex flex-row justify-center">
          <Image
            width={66}
            height={43}
            src="/logo.svg"
            alt="Logo"
            className="inline w-auto h-[60px] my-4"
            priority={true}
          />
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
          {i18n('title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="currentPassword"
            name="currentPassword"
            label={i18n('currentPassword')}
            type="password"
            variant="outlined"
            margin="normal"
            onChange={(event)=> setCurrentPassword(event.target.value)}
          />
          <TextField
            required fullWidth
            id="newPassword"
            name="newPassword"
            label={i18n('newPassword')}
            type="password"
            variant="outlined"
            margin="normal"
            onChange={(event)=> setNewPassword(event.target.value)}
          />
          <TextField
            required fullWidth
            id="repeatNewPassword"
            name="repeatNewPassword"
            label={i18n('repeatNewPassword')}
            type="password"
            variant="outlined"
            margin="normal"
            onChange={(event)=> setRepeatNewPassword(event.target.value)}
          />
          <div className="flex flex-row justify-center mt-6">
            <Button
              variant="contained"
              type="submit"
              className="min-w-[120px]"
              disabled={
                currentPassword.length < 8 ||
                newPassword.length < 8 ||
                newPassword !== repeatNewPassword
              }
            >
              {i18n('confirm')}
            </Button>
          </div>
        </Box>
      </Card>
    </Modal>
  );
}

function NavbarDrawer(props: NavbarDrawerProps ) : ReactNode {
  const i18n = useTranslations('homePage.labels.drawer');
  const router = useRouter();
  const lang = useParams().lang;
  const [isPasswordModalOpen, setPasswordModalOpen] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    router.replace(`/${lang}`);
  };

  const handlePasswordChange = async () => {
    props.setDrawerOpen(false);
    // Delay to wait for drawer to close
    setTimeout(() => setPasswordModalOpen(true),200);
  };

  return (
    <>
      <Drawer open={props.isDrawerOpen} onClose={() => props.setDrawerOpen(false)}>
        <List className="w-[350px] h-full flex flex-col py-0">
          <div
            className="flex flex-col items-center pt-7 pb-6
            justify-center relative bg-primary"
          >
            <Image
              src="/cafe-grao.jpg"
              alt="Logo"
              fill={true}
              sizes="350px"
              className="object-cover"
            />
            <div className="bg-yellow-900/25 w-full h-full absolute top-0 left-0"></div>
            <div className="bg-black/25 w-full h-full absolute top-0 left-0"></div>
            <Avatar
              alt="Customer Logo"
              className="h-[100px] w-[100px] border-1 border-solid shadow-sm border-white"
            >
            </Avatar>
            <Typography variant="h5" className="text-center pt-4 drop-shadow-sm text-white">
              {props.customerName}
            </Typography>
          </div>
          <nav className="flex flex-col justify-center mt-4">
            <ListItem className="p-0" onClick={handlePasswordChange}>
              <ListItemButton className="py-4 px-6 flex flex-row justify-center">
                <Icon icon="mdi:password-outline" width={20} className="mr-2"/>
                {i18n('changePassword')}
              </ListItemButton>
            </ListItem>
            <ListItem className="p-0" onClick={handleLogout}>
              <ListItemButton className="py-4 px-6 flex flex-row justify-center">
                <Icon icon="material-symbols:exit-to-app" width={20} className="mr-2"/>
                {i18n('logout')}
              </ListItemButton>
            </ListItem>
          </nav>
        <div className="grow"></div>
        <div className="px-4 pb-4 flex flex-row justify-center mt-4">
          <LanguageSelector/>
        </div>
        </List>
      </Drawer>
      <ChangePasswordModal
        isPasswordModalOpen={isPasswordModalOpen}
        setPasswordModalOpen={setPasswordModalOpen}
      />
    </>
  );
}

function HomeNavbar(props: { customerName: string }){
  const i18n = useTranslations('homePage.labels.navbar');
  const [ isDrawerOpen, setDrawerOpen ] = useState<boolean>(false);
  return (
    <Navbar
      drawer={
        <NavbarDrawer
          customerName={props.customerName}
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      }
      setDrawerOpen={setDrawerOpen}
      i18n={i18n}
    />
  );
}

function OrdersList(props: OrdersListProps) : ReactNode {
  const lang = useParams().lang as string;
  const i18n = useTranslations('homePage.labels.orders');

  const filteredOrdersData = useMemo<OrderData[]>(() => 
    props.ordersData ? props.ordersData.filter(
      (row) => {
        // each filter match everything if empty/unset
        const searchTextMatches = row.orderNumber.includes(props.searchText ?? ''); 
        const dateBiggerOrEqualMin = props.minDate ? parseInt(row.date) >= parseInt(props.minDate) : true;
        const dateSmallerOrEqualMax = props.maxDate ? parseInt(row.date) <= parseInt(props.maxDate) : true;
        const volumeInRange = row.volume >= props.minVolume && row.volume <= props.maxVolume;
        return searchTextMatches && dateBiggerOrEqualMin && dateSmallerOrEqualMax && volumeInRange;
      }
    ) : []
  , [props.ordersData, props.minDate, props.maxDate, props.minVolume, props.maxVolume, props.searchText]);

  return (
    <Card component="section" id="orders-list">
      <CardHeader
        title={i18n('title')}
        icon={<Icon icon="mingcute:ship-line" width={28} className="mr-2"/>}
      />
      <ListRowHeader>
        <Grid item xs={5} className="px-2 flex flex-col justify-center">
          <Typography variant="body2" className="font-bold">
            {i18n('orderNumber')}
          </Typography>
        </Grid>
        <Grid item xs={4} className="px-2 flex flex-col justify-center">
          <Typography variant="body2" className="font-bold">
            {i18n('date')}
          </Typography>
        </Grid>
        <Grid item xs={3} className="px-2 flex flex-col justify-center">
          <Typography variant="body2" className="font-bold">
            {i18n('volume')}
          </Typography>
        </Grid>
      </ListRowHeader>
      { filteredOrdersData &&
        filteredOrdersData.map(row => { 
          const searchParams = new URLSearchParams();
          searchParams.set("oid", row.orderNumber);
          return (
            <ListRow
              key={row.orderNumber}
              href={`/${lang}/report?${searchParams}`}
            >
              <Grid container>
                <Grid item xs={5} className="px-2 flex flex-col justify-center">
                  <Typography variant="body2">
                    {row.orderNumber}
                  </Typography>
                </Grid>
                <Grid item xs={4} className="px-2 flex flex-col justify-center">
                  <Typography variant="body2">
                    {formatDate(row.date)}
                  </Typography>
                </Grid>
                <Grid item xs={3} className="px-2 flex flex-col justify-center">
                  <Typography variant="body2">
                    {row.volume}
                  </Typography>
                </Grid>
              </Grid>
            </ListRow>
          );
        })
      }
      { props.ordersData === undefined &&
        <article id="orders-loading" className="py-2">
          <Grid container>
            <Grid item xs={5} className="px-2 flex flex-col justify-center">
              <Typography variant="body2">
                <Skeleton width={150}/>
              </Typography>
            </Grid>
            <Grid item xs={4} className="px-2 flex flex-col justify-center">
              <Typography variant="body2">
                <Skeleton width={100}/>
              </Typography>
            </Grid>
            <Grid item xs={3} className="px-2 flex flex-col justify-center">
              <Typography variant="body2">
                <Skeleton width={70}/>
              </Typography>
            </Grid>
          </Grid>
        </article>
      }
      { props.ordersData === null &&
        <ListRowErrorMessage
          id="orders-error"
          message={i18n('noOrdersError')}
          type="error"
        />
      }
      { props.ordersData && props.ordersData.length > 0 && filteredOrdersData.length === 0 &&
        <ListRowErrorMessage
          id="orders-filter-none"
          message={i18n('noFilteredOrdersAlert')}
          type="alert"
        />
      }
    </Card>
  );
}

function OrdersListFilters(props: OrdersListFiltersProps) : ReactNode {
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));
  
  const i18n = useTranslations('homePage.labels.orders');
  const lang = useParams().lang as string;
  const [ filtersVisibility, setFiltersVisibility ] = useState(!isMedium);

    // Locale for MUI DatePicker
  const getDatePickerLocaleText = (lang: string) => {
    if(lang === 'pt'){
      return ptBR.components.MuiLocalizationProvider.defaultProps.localeText;
    }
    return enUS.components.MuiLocalizationProvider.defaultProps.localeText;
  };
  const datePickerLocaleText = getDatePickerLocaleText(lang);

  // Locale for Dayjs
  getDayjsLocalization(lang);

  return (
    <section id="orders-list-filters" className="py-2">
      <div className="flex flex-row items-center justify-start">
        <Button className={`
          flex flex-row items-center p-1 ${filtersVisibility ? 'mb-1' : ''}
          text-neutral-800 border-neutral-800`}
          onClick={()=> setFiltersVisibility(visibility => !visibility)}
        >
          <Icon icon="bi:filter" width={20}/>
          <span className="ml-1">{i18n(filtersVisibility ? 'hideFilters' : 'showFilters')}</span>
        </Button>
      </div>
      { filtersVisibility &&
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={lang}
          localeText={datePickerLocaleText}
        >

          <Grid container
            alignItems="center"
            justifyContent="space-evenly"
            columnSpacing={3}
            rowSpacing={2}
            className="px-6 pt-3 pb-4"
          >
            <Grid item xs={7} sm={4} md={3}>
              <TextField
                variant="standard"
                label={i18n('searchOrderNumber')}
                value={props.searchText}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="mdi:search" width={24}/>
                    </InputAdornment>
                  )
                }}
                onChange={(event) => props.setSearchText(event.target.value)}
                className="w-full"
              />
            </Grid>
            <Grid item xs={5} sm={3} md={2}>
              <DatePicker
                value={dayjs(props.minDate, 'YYYYMMDD')}
                label={i18n('dateFrom')}
                format="DD/MM/YYYY"
                defaultValue={undefined}
                onChange={(newMinDate: Dayjs | null) => {
                  if(newMinDate){
                    props.setMinDate(newMinDate.isValid() ? newMinDate.format('YYYYMMDD') : '');
                  }
                }}
                slotProps={{
                  textField: { variant: 'standard' },
                  inputAdornment: {
                    position: 'start'
                  }
                }}
                className="w-full"
              />
            </Grid>
            <Grid item xs={5} sm={3} md={2}>
              <DatePicker
                value={dayjs(props.maxDate, 'YYYYMMDD')}
                label={i18n('dateTo')}
                format="DD/MM/YYYY"
                defaultValue={undefined}
                onChange={(newMaxDate: Dayjs | null) => {
                  if(newMaxDate){
                    props.setMaxDate(newMaxDate.isValid() ? newMaxDate.format('YYYYMMDD') : '');
                  }
                }}
                slotProps={{
                  textField: { variant: 'standard' },
                  inputAdornment: {
                    position: 'start'
                  }
                }}
                className="w-full"
              />
            </Grid>
            <Grid item xs={7} sm={5} md={3}>
              <InputLabel id="volume-slider-label" shrink className="leading-[1.2rem]">
                {i18n('volume')}
              </InputLabel>
              <div className="flex flex-row gap-4">
                <Input
                  value={props.minVolume}
                  size="small"
                  onChange={(event) => {
                    const numValue = parseInt(event.target.value);
                    props.setMinVolume(isNaN(numValue) ? props.minVolumeLimit : numValue)
                  }}
                  aria-label={i18n('minVolume')}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: props.maxVolumeLimit,
                    pattern: '[0-9]*'
                  }}
                />
                <Slider
                  min={props.minVolumeLimit}
                  max={props.maxVolumeLimit}
                  size="medium"
                  value={[props.minVolume, props.maxVolume]}
                  onChange={(_, newValue: number | number[]) => {
                    newValue = newValue as number[];
                    props.setMinVolume(newValue[0]);
                    props.setMaxVolume(newValue[1]);
                  }}
                  valueLabelDisplay="auto"
                  getAriaLabel={() => i18n('volumeRange')}
                  getAriaValueText={()=>
                    `${i18n('min')}: ${props.minVolume} ${i18n('max')}: ${props.maxVolume}`
                  }
                />
                <Input
                  value={props.maxVolume}
                  size="small"
                  onChange={(event) => {
                    const numValue = parseInt(event.target.value);
                    props.setMaxVolume(isNaN(numValue) ? props.maxVolumeLimit : numValue)
                  }}
                  aria-label={i18n('maxVolume')}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: props.maxVolumeLimit,
                    pattern: '[0-9]*'
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={2} md={2}
              className="flex flex-col items-center justify-center"
            >
              <Button
                className="w-[150px]"
                variant="outlined"
                onClick={()=> {
                  props.setMinVolume(props.minVolumeLimit);
                  props.setMaxVolume(props.maxVolumeLimit);
                  props.setMinDate(props.minDateLimit);
                  props.setMaxDate(props.maxDateLimit);
                  props.setSearchText('');
                }}
              >
                {i18n('clear')}
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      }
    </section>
  );
}

function Orders() : ReactNode {
  // Filter states
  const [ minDateLimit, setMinDateLimit ] = useState<string>(dayjs().format('YYYYMMDD'));
  const [ maxDateLimit, setMaxDateLimit ] = useState<string>(dayjs().format('YYYYMMDD'));
  const [ minDate,setMinDate ] = useState<string>(minDateLimit);
  const [ maxDate,setMaxDate ] = useState<string>(maxDateLimit);

  const [ minVolumeLimit, setMinVolumeLimit ] = useState<number>(0);
  const [ maxVolumeLimit, setMaxVolumeLimit ] = useState<number>(0);
  const [ minVolume, setMinVolume ] = useState<number>(minVolumeLimit);
  const [ maxVolume, setMaxVolume ] = useState<number>(maxVolumeLimit);

  const [ searchText,setSearchText ] = useState<string>('');
  
  const [ ordersData, setOrdersData ] = useState<OrderData[] | undefined | null>(undefined);

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
    if(ordersData && ordersData.length > 0){
      let minVolume: number = ordersData[0].volume;
      let maxVolume: number = ordersData[0].volume;
      let minDate: string = ordersData[0].date;
      let maxDate: string = ordersData[0].date;

      for(const order of ordersData.slice(1)){
        if(order.volume < minVolume) minVolume = order.volume;
        if(order.volume > maxVolume) maxVolume = order.volume;
        if(parseInt(order.date) > parseInt(maxDate)) maxDate = order.date;
        if(parseInt(order.date) < parseInt(minDate)) minDate = order.date;
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

export default function HomePage() : ReactNode {
  const [ token, setToken ] = useState<string | null>(null);
  const router = useRouter();
  const lang = useParams().lang;
  const customerName = 'Customer Name';

  useEffect(()=>{
    const retrievedToken: string | null = 
      localStorage.getItem('token') ?? sessionStorage.getItem('token');
    if(retrievedToken){
      setToken(retrievedToken);
    }
    else {
      router.replace(`/${lang}`);
    }    
  }, [lang, token, router]);

  return(
    token ?
    <div className="flex flex-col h-[100vh] bg-surface">
      <HomeNavbar customerName={customerName}/>
      <main className="grow">
        <Scrollbars universal>
          <div className="flex flex-col h-full">
            <div className="grow">
              <Orders/>
            </div>
            <CopyrightText className="mt-4 mb-2"/>
          </div>
        </Scrollbars>
      </main>
    </div> : <LoadingScreen id="orders-loading"/>
  );
}