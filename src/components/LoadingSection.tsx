'use client';
import { Iconify } from '@/components/Iconify';
import { ComponentProps } from '@/typing/props';

export function LoadingSection(props: ComponentProps) {
  const { className } = props;
  return (
    <div
      className={`h-[200px] flex flex-row items-center justify-center py-4 ${
        className ?? ''
      }`}
    >
      <Iconify
        icon="svg-spinners:ring-resize"
        width={40}
        className="text-primary"
      />
    </div>
  );
}
