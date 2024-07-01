'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { LanguageSelector } from '@/components/LanguageSelector';
import { BannerScrollProps } from '@/typing/props';
import { LoginForm } from './LoginForm';
import { useInView } from '@/utils/hooks';
import { TokenProvider } from '@/context/TokenContext';
import { basePath } from '@/utils/constants';

export function LoginAside(props: BannerScrollProps) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);
  const inView = useInView(ref, 80);

  useEffect(() => {
    if (inView && !animate) setAnimate(true);
  }, [animate, inView]);

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
      <div
        className="bg-white pb-6 px-8 pt-8 flex-col items-center 
        xs:rounded-xl xs:drop-shadow-md
        lg:rounded-none lg:drop-shadow-none lg:flex lg:pt-4 lg:w-full"
      >
        <Image
          width={100}
          height={65}
          src={`${basePath}/logo.svg`}
          alt="Logo"
          className={`hidden lg:inline w-auto h-[80px] mt-8
          ${animate ? 'animate-fade-down' : ''}`}
          priority={true}
        />
        <div className="grow-[3]"></div>
        <div
          className={`mb-12 lg:mb-0
          ${animate ? 'animate-fade-down animate-delay-[100ms]' : ''}`}
        >
          <TokenProvider>
            <LoginForm {...props} />
          </TokenProvider>
        </div>
        <div className="grow-[5]"></div>
        <div
          className={`flex flex-col items-center
          ${animate ? 'animate-fade-down' : ''}`}
        >
          <LanguageSelector />
        </div>
      </div>
    </Grid>
  );
}
