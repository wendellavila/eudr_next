'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { NavbarDrawer } from './NavbarDrawer';

export function HomeNavbar(props: { customerName: string }) {
  const { customerName } = props;
  const i18n = useTranslations('homePage.labels.navbar');
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <Navbar
      drawer={
        <NavbarDrawer
          customerName={customerName}
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      }
      setDrawerOpen={setDrawerOpen}
      i18n={i18n}
    />
  );
}
