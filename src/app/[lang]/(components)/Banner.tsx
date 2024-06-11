'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Divider,
  Grid,
  Link,
  Slide,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { InView, useInView } from 'react-intersection-observer';
import { theme } from '@/config/mui-theme';
import { scrollToId } from '@/utils/functions';
import { basePath, companyName } from '@/utils/constants';

export function Banner() {
  const i18n = useTranslations('loginPage.labels.banner');
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  const [viewCount, setViewCount] = useState<number>(0);
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });

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
      <InView
        as="div"
        className="flex flex-col px-10 items-center h-full
        drop-shadow-md text-white text-center"
        onChange={(inView, _) => {
          if (inView) {
            setViewCount(viewCount + 1);
          }
        }}
      >
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={600}>
          <div className="flex flex-col items-center">
            {isMedium ? (
              <Image
                width={100}
                height={65}
                src={`${basePath}/logo_dark.svg`}
                alt="Logo"
                className="mt-3 w-auto h-[80px]"
                priority={true}
              />
            ) : (
              <></>
            )}
            <Typography
              component="h1"
              variant="h3"
              className="mb-3 mt-8 font-bold break-words xl:px-20"
            >
              {i18n('title').toLocaleUpperCase()}
            </Typography>
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
            <Typography component="p" variant="h6">
              {companyName.toLocaleUpperCase()}
            </Typography>
          </div>
        </Slide>
        <div className="flex-grow"></div>
        {isSmall ? (
          <div className="h-10"></div>
        ) : (
          <Slide
            direction="down"
            in={viewCount > 0}
            appear={false}
            timeout={800}
          >
            <Grid container rowGap={6} className="px-2 py-8">
              <Grid component="article" item xs={12} sm={6} className="px-10">
                <Iconify
                  icon="healthicons:agriculture-outline"
                  width={60}
                  className="border-solid border-3 rounded-xl p-1 mb-4"
                />
                <Typography
                  component="h3"
                  variant="h4"
                  className="mb-2 break-words hyphens-auto"
                >
                  {i18n('deforestationReports')}
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  className="max-w-96 m-auto text-md"
                >
                  {i18n('deforestationReportsDescription')}
                </Typography>
              </Grid>
              <Grid component="article" item xs={12} sm={6} className="px-10">
                <Iconify
                  icon="carbon:map-boundary-vegetation"
                  width={60}
                  className="border-solid border-3 rounded-xl p-1 mb-4"
                />
                <Typography
                  component="h3"
                  variant="h4"
                  className="mb-2 break-words hyphens-auto"
                >
                  {i18n('geopositioning')}
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  className="max-w-96 m-auto text-md"
                >
                  {i18n('geopositioningDescription')}
                </Typography>
              </Grid>
            </Grid>
          </Slide>
        )}
        <div className="flex-grow xs:mb-8"></div>
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={600}>
          <Link
            className="text-white no-underline cursor-pointer"
            onClick={() => scrollToId('#about')}
          >
            <div className="mb-1 select-none">
              {i18n('learnMore').toUpperCase()}
            </div>
            <div className="animate-pulse xs:mb-4 lg:mb-0">
              <Iconify
                icon="carbon:chevron-down"
                width={40}
                height={40}
                color="white"
              />
            </div>
          </Link>
        </Slide>
      </InView>
    </Grid>
  );
}
