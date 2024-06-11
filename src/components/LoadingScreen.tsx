'use client';

import Image from 'next/image';
import { Iconify } from '@/components/Iconify';
import { basePath } from '@/utils/constants';

export function LoadingScreen(props: { id?: string }) {
  const { id } = props;

  return (
    <section
      id={id}
      className="bg-white min-h-[100vh] flex flex-col items-center justify-center"
    >
      <div className="grow-[2]"></div>
      <Image
        width={100}
        height={65}
        src={`${basePath}/logo.svg`}
        alt="Logo"
        className="mb-10 w-auto h-[100px]"
        priority={true}
      />
      <Iconify
        icon="svg-spinners:3-dots-fade"
        width={40}
        className="text-tertiary"
      />
      <div className="grow-[3]"></div>
    </section>
  );
}
