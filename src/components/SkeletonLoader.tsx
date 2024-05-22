'use client';
import { Skeleton } from '@mui/material';
import { ComponentProps } from '@/typing/props';

interface SkeletonLoaderProps extends ComponentProps {
  width?: number;
  height?: number;
}

export function SkeletonLoader(props: SkeletonLoaderProps) {
  const { children, height, id, width } = props;
  return (
    <div id={id} className="pl-2 py-3">
      {children ? (
        children
      ) : (
        <Skeleton width={width ?? 80} height={height ?? 20} />
      )}
    </div>
  );
}
