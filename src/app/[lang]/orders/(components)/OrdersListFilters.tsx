'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Button,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Slider,
  useMediaQuery,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Iconify } from '@/components/Iconify';
import { enUS, ptBR } from '@mui/x-date-pickers/locales';
import { getDayjsLocalization } from '@/config/i18n';
import { theme } from '@/config/mui-theme';
import { SetState } from '@/typing/types';

interface OrdersListFiltersProps {
  minDate: string;
  maxDate: string;
  minDateLimit: string;
  maxDateLimit: string;
  minVolume: number;
  maxVolume: number;
  minVolumeLimit: number;
  maxVolumeLimit: number;
  searchText: string;
  setMinDate: SetState<string>;
  setMaxDate: SetState<string>;
  setMinVolume: SetState<number>;
  setMaxVolume: SetState<number>;
  setMaxVolumeLimit: SetState<number>;
  setSearchText: SetState<string>;
}

export function OrdersListFilters(props: OrdersListFiltersProps) {
  const {
    minDate,
    maxDate,
    minDateLimit,
    maxDateLimit,
    minVolume,
    maxVolume,
    minVolumeLimit,
    maxVolumeLimit,
    searchText,
    setMinDate,
    setMaxDate,
    setMinVolume,
    setMaxVolume,
    setSearchText,
  } = props;
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  const i18n = useTranslations('homePage.labels.orders');
  const lang = useParams().lang as string;
  const [filtersVisibility, setFiltersVisibility] = useState(!isMedium);

  // Locale for MUI DatePicker
  const getDatePickerLocaleText = (lang: string) => {
    if (lang === 'pt') {
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
        <Button
          className={`
          flex flex-row items-center p-1 ${filtersVisibility ? 'mb-1' : ''}
          text-neutral-800 border-neutral-800`}
          onClick={() => setFiltersVisibility(visibility => !visibility)}
        >
          <Iconify icon="bi:filter" width={20} />
          <span className="ml-1">
            {i18n(filtersVisibility ? 'hideFilters' : 'showFilters')}
          </span>
        </Button>
      </div>
      {filtersVisibility && (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={lang}
          localeText={datePickerLocaleText}
        >
          <Grid
            container
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
                value={searchText}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="mdi:search" width={24} />
                    </InputAdornment>
                  ),
                }}
                onChange={event => setSearchText(event.target.value)}
                className="w-full"
              />
            </Grid>
            <Grid item xs={5} sm={3} md={2}>
              <DatePicker
                value={dayjs(minDate, 'YYYYMMDD')}
                label={i18n('dateFrom')}
                format="DD/MM/YYYY"
                defaultValue={undefined}
                onChange={(newMinDate: Dayjs | null) => {
                  if (newMinDate) {
                    setMinDate(
                      newMinDate.isValid() ? newMinDate.format('YYYYMMDD') : ''
                    );
                  }
                }}
                slotProps={{
                  textField: { variant: 'standard' },
                  inputAdornment: {
                    position: 'start',
                  },
                }}
                className="w-full"
              />
            </Grid>
            <Grid item xs={5} sm={3} md={2}>
              <DatePicker
                value={dayjs(maxDate, 'YYYYMMDD')}
                label={i18n('dateTo')}
                format="DD/MM/YYYY"
                defaultValue={undefined}
                onChange={(newMaxDate: Dayjs | null) => {
                  if (newMaxDate) {
                    setMaxDate(
                      newMaxDate.isValid() ? newMaxDate.format('YYYYMMDD') : ''
                    );
                  }
                }}
                slotProps={{
                  textField: { variant: 'standard' },
                  inputAdornment: {
                    position: 'start',
                  },
                }}
                className="w-full"
              />
            </Grid>
            <Grid item xs={7} sm={5} md={3}>
              <InputLabel
                id="volume-slider-label"
                shrink
                className="leading-[1.2rem]"
              >
                {i18n('volume')}
              </InputLabel>
              <div className="flex flex-row gap-4">
                <Input
                  value={minVolume}
                  size="small"
                  onChange={event => {
                    const numValue = parseInt(event.target.value);
                    setMinVolume(isNaN(numValue) ? minVolumeLimit : numValue);
                  }}
                  aria-label={i18n('minVolume')}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: maxVolumeLimit,
                    pattern: '[0-9]*',
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
                  getAriaLabel={() => i18n('volumeRange')}
                  getAriaValueText={() =>
                    `${i18n('min')}: ${minVolume} ${i18n('max')}: ${maxVolume}`
                  }
                />
                <Input
                  value={maxVolume}
                  size="small"
                  onChange={event => {
                    const numValue = parseInt(event.target.value);
                    setMaxVolume(isNaN(numValue) ? maxVolumeLimit : numValue);
                  }}
                  aria-label={i18n('maxVolume')}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: maxVolumeLimit,
                    pattern: '[0-9]*',
                  }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              md={2}
              className="flex flex-col items-center justify-center"
            >
              <Button
                className="w-[150px]"
                variant="outlined"
                onClick={() => {
                  setMinVolume(minVolumeLimit);
                  setMaxVolume(maxVolumeLimit);
                  setMinDate(minDateLimit);
                  setMaxDate(maxDateLimit);
                  setSearchText('');
                }}
              >
                {i18n('clear')}
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      )}
    </section>
  );
}
