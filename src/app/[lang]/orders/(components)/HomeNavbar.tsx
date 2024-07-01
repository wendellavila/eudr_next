'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { NavbarDrawer } from './NavbarDrawer';

interface Props {
  customerName: string;
  logo?: string;
}

export function HomeNavbar(props: Props) {
  const { customerName, logo } = props;
  const i18n = useTranslations('ordersPage.labels.navbar');
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <Navbar
      drawer={
        <NavbarDrawer
          customerName={customerName}
          logo={logo}
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      }
      setDrawerOpen={setDrawerOpen}
      i18n={i18n}
    />
  );
}
