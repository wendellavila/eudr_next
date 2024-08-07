'use client';
import { ComponentProps } from '@/typing/props';

interface Props extends ComponentProps {
  title: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export function CardHeader(props: Props) {
  const { title, icon, actions, className } = props;
  return (
    <div
      className={`flex flex-row px-4 py-1.5 items-center
      bg-stone-800 text-gray-50 ${className ?? ''}`}
    >
      {icon}
      <h3 className="text-xl m-0 font-medium">{title}</h3>
      {actions && (
        <>
          <div className="grow"></div>
          {actions}
        </>
      )}
    </div>
  );
}
