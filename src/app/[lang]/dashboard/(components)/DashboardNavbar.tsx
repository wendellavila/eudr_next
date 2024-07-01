'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { NavbarDrawer } from '@/components/NavbarDrawer';
import { ComponentProps } from '@/typing/props';

interface Props extends ComponentProps {
  customerName?: string;
  customerId?: string;
  hideDrawer?: boolean;
  logo?: string;
}

export function DashboardNavbar(props: Props) {
  const i18n = useTranslations('dashboardPage.labels.navbar');
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { customerId, customerName, hideDrawer, className, logo } = props;
  return (
    <Navbar
      className={className}
      drawer={
        hideDrawer ? undefined : (
          <NavbarDrawer
            logo={logo}
            customerId={customerId}
            customerName={customerName}
            isDrawerOpen={isDrawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
        )
      }
      setDrawerOpen={setDrawerOpen}
      i18n={i18n}
    />
  );
}
