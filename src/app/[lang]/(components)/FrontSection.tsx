'use client';

import Image from 'next/image';
import { Grid } from '@mui/material';
import { LoginAside } from './LoginAside';
import { Banner } from './Banner';
import { basePath } from '@/utils/constants';
import { BannerScrollProps } from '@/typing/props';

/**
 * Returns the current date as a yyyymmdd integer. This function does not account for timezones.
 * It is intended to be used in simple scenarios such as using the current date as a seed for a pseudorandom algorithm.
 */
export function dateToInt() {
  return Number(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
}

/**
 * Returns a random integer bigger than or equal to {min} and smaller than {max}.
 * @param {number} min - An integer used as the lower bound of possible randomly generated integers (Inclusive)
 * @param {number} max - An integer used as the upper bound of possible randomly generated integers (Exclusive)
 * @param {number} seed - An integer used as seed for the pseudorandom number generator.
 */
export function getRandomInt(min: number, max: number, seed?: number): number {
  const randomWithSeed = (seed: number): number => {
    // Forcing int
    seed = Math.round(seed);
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  let randomNumber = 0;
  if (seed !== undefined) {
    randomNumber = randomWithSeed(seed);
  } else {
    randomNumber = Math.random();
  }
  return Math.floor(randomNumber * (max - min)) + min;
}

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
