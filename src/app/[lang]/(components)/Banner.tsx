'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Divider, Grid, Typography } from '@mui/material';
import { companyName } from '@/utils/constants';
import { BannerScrollProps } from '@/typing/props';
import { useInView } from '@/utils/hooks';
import { Iconify } from '@/components/Iconify';
import { basePath } from '@/utils/constants';

export function Banner(props: BannerScrollProps) {
  const i18n = useTranslations('loginPage.labels.banner');

  const { aboutRef } = props;

  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);
  const inView = useInView(ref, 80);

  useEffect(() => {
    if (inView && !animate) setAnimate(true);
  }, [animate, inView]);
  return (
    <Grid
      ref={ref}
      item
      component="article"
      id="banner-visuals"
      xs={12}
      lg={8}
      xl={9}
      className="box-border px-4 pt-4"
    >
      <div
        className="flex flex-col px-10 items-center h-full
        drop-shadow-md text-white text-center"
      >
        <div
          className={`flex flex-col items-center
          ${animate ? 'animate-fade-down animate-delay-[100ms]' : ''}`}
        >
          <Image
            width={100}
            height={65}
            src={`${basePath}/logo_dark.svg`}
            alt="Logo"
            className="mt-3 w-auto h-[80px] md:hidden block animate-fade-down"
            priority={true}
          />
          <h1 className="mb-3 mt-8 font-bold break-words xl:px-20 text-5xl">
            {i18n('title').toLocaleUpperCase()}
          </h1>
          <Divider
            className="select-none mt-1 mb-2 w-[100px]"
            sx={{
              '&::before, &::after': {
                borderColor: 'white',
              },
            }}
          >
            <Iconify icon="fluent:leaf-two-16-regular" width={22} />
          </Divider>
          <p className="text-xl font-normal">
            {companyName.toLocaleUpperCase()}
          </p>
        </div>
        <div className="flex-grow"></div>
        <div className="xs:h-10 md:hidden"></div>
        <Grid
          container
          rowGap={6}
          className={`px-2 py-8 xs:hidden md:flex
          ${animate ? 'animate-fade-down animate-delay-[400ms]' : ''}`}
        >
          <Grid component="article" item xs={12} sm={6} className="px-10">
            <Iconify
              icon="healthicons:agriculture-outline"
              width={60}
              className="border-solid border-3 rounded-xl p-1 mb-4"
            />
            <h4 className="mt-2 mb-4 break-words hyphens-auto text-3xl font-normal">
              {i18n('deforestationReports')}
            </h4>
            <div className="flex flex-col items-center">
              <Typography
                component="p"
                variant="body1"
                className="max-w-96 text-md"
              >
                {i18n('deforestationReportsDescription')}
              </Typography>
            </div>
          </Grid>
          <Grid component="article" item xs={12} sm={6} className="px-10">
            <Iconify
              icon="carbon:map-boundary-vegetation"
              width={60}
              className="border-solid border-3 rounded-xl p-1 mb-4"
            />
            <h4 className="mt-2 mb-4 break-words hyphens-auto text-3xl font-normal">
              {i18n('geopositioning')}
            </h4>
            <div className="flex flex-col items-center">
              <Typography
                component="p"
                variant="body1"
                className="max-w-96 m-auto text-md"
              >
                {i18n('geopositioningDescription')}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <div className="flex-grow xs:mb-8"></div>
        <a
          href="#about"
          className={`text-white no-underline cursor-pointer
              ${animate ? 'animate-fade-down animate-delay-[100ms]' : ''}`}
          onClick={event => {
            event.preventDefault();
            aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="mb-1 select-none">
            {i18n('learnMore').toUpperCase()}
          </div>
          <div className="animate-pulse xs:mb-4 lg:mb-0">
            <Iconify
              icon="carbon:chevron-down"
              width={40}
              height={40}
              className="text-white"
            />
          </div>
        </a>
      </div>
    </Grid>
  );
}
