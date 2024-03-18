'use client';
import { ReactNode,useEffect,useMemo,useState } from 'react';
import { useParams,useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Avatar,Box,Button,Card,Drawer,Input,List,ListItem,ListItemButton,Modal,
  IconButton,TextField,Typography,InputAdornment,Slider,InputLabel
} from '@mui/material';
import { DatePicker,LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Icon } from '@iconify/react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
  MaterialReactTable,useMaterialReactTable,type MRT_ColumnDef,
} from 'material-react-table';
import { Dayjs } from 'dayjs';
import { enUS,ptBR } from '@mui/x-date-pickers';

import {
  getDayjsLocalization,getMaterialReactTableLocalization 
} from '@/config/i18n';
import { formatDate } from '@/utils/functions';
import { CardHeader,LanguageSelector,LoadingScreen } from '@/components/client';
import {
  ChangePasswordModalProps,NavbarDrawerProps,OrdersListTableProps
} from '@/typing/props';
import { OrderInfo } from '@/typing/types';

function ChangePasswordModal(props: ChangePasswordModalProps) : ReactNode {
  const i18n = useTranslations('homePage.labels.changePasswordModal');

  const [ currentPassword, setCurrentPassword ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ repeatNewPassword, setRepeatNewPassword ] = useState('');

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
          <img
            width={66}
            height={43}
            src={`/img/logo.svg`}
            alt="Logo"
            className="inline w-auto h-[60px] my-4"
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
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    router.replace(`/${lang}/`);
  };

  const handlePasswordChange = async () => {
    props.setDrawerOpen(false);
    // Delay to wait for drawer to close
    setTimeout(() => setPasswordModalOpen(true),200);
  };

  return (
    <>
      <Drawer open={props.isDrawerOpen} onClose={() => props.setDrawerOpen(false)}>
        <List className="w-[350px] h-full flex flex-col p-0">
          <Box
            sx={{backgroundImage : `url(/img/cafe-grao.jpg)`}}
            className="min-h-[200px] flex flex-col items-center justify-center pt-4 relative bg-primary">
            <div className="bg-yellow-900/15 w-full h-full absolute top-0 left-0 backdrop-blur-md"></div>
            <Avatar
              alt="Customer Logo"
              className="h-[100px] w-[100px] border-1 border-solid shadow-sm border-white"
            >
            </Avatar>
            <Typography variant="h5" className="text-center py-4 drop-shadow-sm text-white">
              Customer Name
            </Typography>
          </Box>
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

function Navbar(){
  const i18n = useTranslations('homePage.labels.navbar');
  const [ isDrawerOpen, setDrawerOpen ] = useState(false);

  return (
    <Card
      component="header"
      className="px-4 py-3 flex items-center rounded-none justify-between
      text-foreground z-10"
    >
      <IconButton className="mr-3 text-foreground" aria-label="menu"
        sx={{}}
        onClick={() => setDrawerOpen(true)}>
        <Icon icon="mdi:menu" width={22}/>
      </IconButton>
      <NavbarDrawer isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen}/>
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

function OrdersListTable(props: OrdersListTableProps) : ReactNode {
  const i18n = useTranslations('homePage.labels.orders');
  const router = useRouter();
  const lang = useParams().lang as string;

  const filteredOrderRows = useMemo<OrderInfo[]>(
    () => props.orderRows.filter(
      (row) => {
        // each filter match everything if empty/unset
        const searchTextMatches = row.orderNumber.includes(props.searchText ?? ''); 
        const dateBiggerOrEqualMin = props.minDate ? parseInt(row.date) >= parseInt(props.minDate) : true;
        const dateSmallerOrEqualMax = props.maxDate ? parseInt(row.date) <= parseInt(props.maxDate) : true;
        const volumeInRange = row.volume >= props.minVolume && row.volume <= props.maxVolume;
        console.log(`${row.volume} - ${props.minVolume} - ${props.maxVolume} - ${volumeInRange}`)
        return searchTextMatches && dateBiggerOrEqualMin && dateSmallerOrEqualMax && volumeInRange;
      }
    ), [props]
  );

  const columns = useMemo<MRT_ColumnDef<OrderInfo>[]>(
    () => [
      {
        accessorKey: 'orderNumber',
        header: i18n('orderNumber'),
        size: 50
      },
      {
        accessorKey: 'date',
        header: i18n('date'),
        size: 25,
        accessorFn: (row) => formatDate(row.date)
      },
      {
        accessorKey: 'volume',
        header: i18n('volume'),
        size: 25
      }
    ],
    [i18n],
  );
  
  const table = useMaterialReactTable({
    columns,
    data: filteredOrderRows,
    localization: getMaterialReactTableLocalization(lang),
    muiPaginationProps:{
      rowsPerPageOptions: [15, 50, 150],
    },
    initialState: {
      pagination: { pageSize: 15, pageIndex: 0 },
      density: 'compact',
      sorting: [
        {
          id: 'date', //sort by age by default on page load
          desc: true,
        },
      ],
    },
    defaultColumn: {
      minSize: 1, //allow columns to get smaller than default
      maxSize: 1000, //allow columns to get larger than default
      muiTableHeadCellProps: {
        align: 'left',
        className: 'px-4 bg-neutral-50'
      },
      muiTableBodyCellProps: {
        align: 'left',
        className: 'px-4'
      }
    },
    enableColumnActions: false,
    enableTopToolbar: true,
    muiTableHeadCellProps: {
      className: 'bg-stone-100 py-1',
    },
    renderTopToolbar: (_) => (
      <CardHeader
        title={i18n('title')}
        icon={<Icon icon="mingcute:ship-line" width={28} className="mr-2"/>}
      />
    ),
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        const orderNumber  = row.original.orderNumber;
        const searchParams = new URLSearchParams();
        searchParams.set("oid", orderNumber);
        router.push(`/${lang}/report?${searchParams}`);
      },
      className: 'cursor-pointer',
    }),
  });

  return (
    <main className="grow select-none">
      <MaterialReactTable table={table}/>
    </main>
  );
}

function OrdersList() : ReactNode {
  const i18n = useTranslations('homePage.labels.orders');
  const lang = useParams().lang as string;

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

  // Filter states
  const [ minDate,setMinDate ] = useState<string>('');
  const [ maxDate,setMaxDate ] = useState<string>('');
  const [ searchText,setSearchText ] = useState<string>('');
  const minVolumeLimit = 0;
  const [ maxVolumeLimit, setMaxVolumeLimit ] = useState<number>(0);
  const [ minVolume, setMinVolume ] = useState<number>(minVolumeLimit);
  const [ maxVolume, setMaxVolume ] = useState<number>(maxVolumeLimit);

  const [ orderRows, setOrderRows ] = useState<OrderInfo[]>([]);

  useEffect(() => {
    setOrderRows(
      Array.from(Array(30).keys()).map((_, index) => {
        return {
          orderNumber: `${(index+1).toString().padStart(4,'0')}/2023`,
          date: `202301${(index+1).toString().padStart(2, '0')}`,
          volume: 320,
        }
      }),
    );
  }, []);

  useEffect(() => {
    if(orderRows.length > 0){
      const rowWithMaxVolume = orderRows.reduce(
        (prev, current) => (prev && prev.volume > current.volume) ? prev : current
      , {volume: 0});
      setMaxVolumeLimit(rowWithMaxVolume.volume);
      setMaxVolume(rowWithMaxVolume.volume);
    }
  }, [orderRows]);

  return (
    <section id="orders-list" className="p-4">
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={lang}
        localeText={datePickerLocaleText}
      >
        <div className="flex flex-col items-center">
          <div
            id="orders-list-toolbar"
            className="flex flex-row flex-wrap gap-5 justify-center mb-5 px-4"
          >
            <TextField variant="standard" label={i18n('searchOrderNumber')}
              className="max-w-[250px] grow-[2]"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="mdi:search" width={24}/>
                  </InputAdornment>
                )
              }}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <DatePicker
              className="max-w-[150px] grow-[1]"
              label={i18n('dateFrom')}
              format="DD/MM/YYYY"
              defaultValue={undefined}
              onChange={(newMinDate: Dayjs | null) => {
                if(newMinDate){
                  setMinDate(newMinDate.isValid() ? newMinDate.format('YYYYMMDD') : '');
                }
              }}
              slotProps={{
                textField: { variant: 'standard' },
                inputAdornment: {
                  position: 'start'
                }
              }}
            />
            <DatePicker
              className="max-w-[150px] grow-[1]"
              label={i18n('dateTo')}
              format="DD/MM/YYYY"
              defaultValue={undefined}
              onChange={(newMaxDate: Dayjs | null) => {
                if(newMaxDate){
                  setMaxDate(newMaxDate.isValid() ? newMaxDate.format('YYYYMMDD') : '');
                }
              }}
              slotProps={{
                textField: { variant: 'standard' },
                inputAdornment: {
                  position: 'start'
                }
              }}
            />
            <div className="max-w-[250px]">
              <InputLabel id="input-slider" shrink className="leading-1">
                {i18n('volume')}
              </InputLabel>
              <div className="flex flex-row gap-4">
                <Input
                  value={minVolume}
                  size="small"
                  onChange={(event) => {
                    const numValue = parseInt(event.target.value);
                    setMinVolume(isNaN(numValue) ? minVolumeLimit : numValue)
                  }}
                  aria-label='Min Volume Input'
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: maxVolumeLimit,
                    pattern: '[0-9]*'
                  }}
                />
                <Slider
                  min={minVolumeLimit}
                  max={maxVolumeLimit}
                  size="medium"
                  value={[minVolume, maxVolume]}
                  onChange={(_, newValue: number | number[]) => {
                    newValue = newValue as number[];
                    setMinVolume(newValue[0]);
                    setMaxVolume(newValue[1]);
                  }}
                  valueLabelDisplay="auto"
                  getAriaLabel={() => 'Volume Slider'}
                  getAriaValueText={()=> `Min: ${minVolume} Max: ${maxVolume}`}
                />
                <Input
                  value={maxVolume}
                  size="small"
                  onChange={(event) => {
                    const numValue = parseInt(event.target.value);
                    setMaxVolume(isNaN(numValue) ? maxVolumeLimit : numValue)
                  }}
                  aria-label='Max Volume Input'
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: maxVolumeLimit,
                    pattern: '[0-9]*'
                  }}
                />
              </div>
            </div>
          </div>
          { orderRows.length > 0 ?
            <div id="orders-list-table" className="max-w-[1200px] w-full">
              <OrdersListTable
                orderRows={orderRows}
                searchText={searchText}
                minDate={minDate}
                maxDate={maxDate}
                minVolume={minVolume}
                maxVolume={maxVolume}
              />
            </div> :
            <div id="orders-list-loading" className="h-[200px] flex flex-col justify-center">
              <Icon icon="svg-spinners:ring-resize" width={40} className="text-primary"/>
            </div>
          }
        </div>
      </LocalizationProvider>
    </section>
  );
}

export default function HomePage() : ReactNode {

  const [ token, setToken ] = useState<string | null>(null);
  const router = useRouter();
  const lang = useParams().lang;

  useEffect(()=>{
    const retrievedToken: string | null = 
      localStorage.getItem('token') ?? sessionStorage.getItem('token');
    if(retrievedToken){
      setToken(retrievedToken);
    }
    else {
      router.replace(`/${lang}/`);
    }    
  }, [lang, token, router]);

  return(
    token ? 
    <div className="flex flex-col h-[100vh] bg-surface">
      <Navbar/>
      <main className="grow">
        <Scrollbars universal>
          <OrdersList/>
        </Scrollbars>
      </main>
    </div> : <LoadingScreen/>
  );
}