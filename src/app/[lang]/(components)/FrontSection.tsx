'use client';

import Image from 'next/image';
import { Grid } from '@mui/material';
import { dateToInt, getRandomInt } from '@/utils/functions';
import { LoginAside } from './LoginAside';
import { Banner } from './Banner';
import { basePath } from '@/utils/constants';
import { BannerScrollProps } from '@/typing/props';

export function FrontSection(props: BannerScrollProps) {
  return (
    <Grid
      container
      component="section"
      id="front-section"
      className="lg:min-h-[100vh] box-border bg-cover
      bg-center bg-no-repeat bg-tertiary grow relative"
    >
      <Image
        src={`${basePath}/cafe-${getRandomInt(0, 9, dateToInt())}.jpg`}
        alt="Logo"
        fill={true}
        sizes="100vw"
        className="object-cover"
      />
      <div className="bg-black/40 w-full h-full absolute top-0 left-0"></div>
      <Banner {...props} />
      <LoginAside {...props} />
    </Grid>
  );
}
