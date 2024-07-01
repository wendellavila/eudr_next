'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, IconButton } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { I18n, SetState } from '@/typing/types';
import { ComponentProps } from '@/typing/props';

interface NavbarProps extends ComponentProps {
  titleAppend?: string | undefined;
  i18n: I18n;
  drawer?: React.ReactNode;
  setDrawerOpen?: SetState<boolean>;
  onBackButton?: () => void;
}

export function Navbar(props: NavbarProps) {
  const router = useRouter();
  const hasDrawer = props.drawer && props.setDrawerOpen;

  const { i18n, titleAppend, onBackButton, className } = props;

  return (
    <Card
      component="header"
      className={`pr-6 py-3 flex items-center rounded-none
      justify-between z-10 h-9 text-foreground 
      ${!hasDrawer && !onBackButton ? 'pl-8' : 'pl-4'}
      ${className ?? ''}`}
    >
      {(hasDrawer || onBackButton) && (
        <IconButton
          className="mr-3 text-foreground animate-fade animate-duration-500"
          aria-label={i18n(hasDrawer ? 'menu' : 'goBack')}
          onClick={() => {
            if (hasDrawer && props.setDrawerOpen) {
              props.setDrawerOpen(isOpen => !isOpen);
            } else {
              if (onBackButton) {
                onBackButton();
              } else {
                router.back();
              }
            }
          }}
        >
          <Iconify
            icon={hasDrawer ? 'mdi:menu' : 'mdi:arrow-back'}
            width={23}
          />
        </IconButton>
      )}
      {props.drawer}
      <div
        className="text-xl font-medium grow animate-fade
        animate-duration-500 animate-delay-150"
      >
        <span>{i18n('title') + (titleAppend ? ` - ${titleAppend}` : '')}</span>
      </div>
      <Image
        width={66}
        height={43}
        src="/logo.svg"
        alt="Logo"
        className="inline w-auto h-[30px]"
        priority={true}
      />
    </Card>
  );
}
