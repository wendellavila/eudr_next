'use client';

import { Grid } from '@mui/material';
import { ComponentProps } from '@/typing/props';

export function ListRowHeader(props: ComponentProps) {
  const { children } = props;
  return (
    <Grid
      container
      className="py-1 bg-neutral-100 border-neutral-200 border-b-[1px]
      border-t-0 border-x-0 border-solid"
    >
      {children}
    </Grid>
  );
}
