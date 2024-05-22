'use client';

import { Typography } from '@mui/material';

interface CardHeaderProps {
  title: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export function CardHeader(props: CardHeaderProps) {
  const { actions, icon, title } = props;
  return (
    <div className="flex flex-row bg-stone-800 text-gray-50 px-4 py-2 items-center">
      {icon}
      <Typography variant="h6" component="h3">
        {title}
      </Typography>
      {actions && (
        <>
          <div className="grow"></div>
          {actions}
        </>
      )}
    </div>
  );
}
