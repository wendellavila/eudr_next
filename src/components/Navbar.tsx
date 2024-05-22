'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, IconButton, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { SetState, I18n } from '@/typing/types';

interface NavbarProps {
  titleAppend?: string | undefined;
  i18n: I18n;
  drawer?: React.ReactNode;
  setDrawerOpen?: SetState<boolean>;
}

export function Navbar(props: NavbarProps) {
  const { i18n, drawer, setDrawerOpen, titleAppend } = props;
  const router = useRouter();
  const hasDrawer = drawer && setDrawerOpen;

  return (
    <Card
      component="header"
      className="px-4 py-3 flex items-center rounded-none justify-between text-foreground z-10"
    >
      <IconButton
        className="mr-3 text-foreground"
        aria-label={i18n(hasDrawer ? 'menu' : 'goBack')}
        onClick={() => {
          if (hasDrawer && setDrawerOpen) {
            setDrawerOpen(isOpen => !isOpen);
          } else {
            router.back();
          }
        }}
      >
        <Icon icon={hasDrawer ? 'mdi:menu' : 'mdi:arrow-back'} width={22} />
      </IconButton>
      {drawer}
      <Typography variant="h6" component="div" className="flex-grow">
        {i18n('title') + (titleAppend ? ` - ${titleAppend}` : '')}
      </Typography>
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
