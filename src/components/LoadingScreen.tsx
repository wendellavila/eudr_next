'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';

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
        src="/logo.svg"
        alt="Logo"
        className="mb-10 w-auto h-[100px]"
        priority={true}
      />
      <Icon
        icon="svg-spinners:3-dots-fade"
        width={40}
        className="text-tertiary"
      />
      <div className="grow-[3]"></div>
    </section>
  );
}
