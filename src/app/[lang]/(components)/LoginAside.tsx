'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Grid, Slide, useMediaQuery } from '@mui/material';
import { InView, useInView } from 'react-intersection-observer';
import { theme } from '@/config/mui-theme';
import { LanguageSelector } from '@/components/LanguageSelector';
import { LoginForm } from './LoginForm';
import { basePath } from '@/utils/constants';

export function LoginAside() {
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  const [viewCount, setViewCount] = useState<number>(0);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <Grid
      ref={ref}
      component="aside"
      id="login"
      item
      xs={12}
      lg={4}
      xl={3}
      className="lg:p-0 xs:px-4 xs:pb-6 lg:flex"
    >
      <InView
        as="div"
        onChange={(inView, _) => {
          if (inView) {
            setViewCount(viewCount + 1);
          }
        }}
        className="bg-white pb-6 px-8 pt-8 flex-col items-center
        xs:rounded-xl xs:drop-shadow-md
        lg:rounded-none lg:drop-shadow-none lg:flex lg:pt-4"
      >
        {isMedium ? (
          <></>
        ) : (
          <Slide
            direction="down"
            in={viewCount > 0}
            appear={false}
            timeout={400}
          >
            <Image
              width={100}
              height={65}
              src={`${basePath}/logo.svg`}
              alt="Logo"
              className="inline w-auto h-[80px] mt-8"
              priority={true}
            />
          </Slide>
        )}
        <div className="grow-[3]"></div>
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={600}>
          <div className="mb-12 lg:mb-0">
            <LoginForm />
          </div>
        </Slide>
        <div className="grow-[5]"></div>
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={400}>
          <div className="flex flex-col items-center">
            <LanguageSelector />
          </div>
        </Slide>
      </InView>
    </Grid>
  );
}
