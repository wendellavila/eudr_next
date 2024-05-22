'use client';
import { Typography } from '@mui/material';
import { Icon } from '@iconify/react';

interface ListRowErrorMessageProps {
  id?: string;
  message: string;
  type: 'alert' | 'error';
}

export function ListRowErrorMessage(props: ListRowErrorMessageProps) {
  const { id, message, type } = props;
  const color = type === 'alert' ? 'text-blue-600' : 'text-red-600';

  return (
    <article id={id} className="py-2 flex flex-row items-center justify-center">
      <Icon icon="mdi:info-outline" className={`mr-1 ${color}`} />
      <Typography variant="body2" className={color}>
        {message}
      </Typography>
    </article>
  );
}
