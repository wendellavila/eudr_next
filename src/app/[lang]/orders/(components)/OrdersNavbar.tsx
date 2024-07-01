'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { NavbarDrawer } from '@/components/NavbarDrawer';
import { useRouter, useParams } from 'next/navigation';
import { ComponentProps } from '@/typing/props';

interface Props extends ComponentProps {
  customerName?: string;
  customerId?: string;
  hideDrawer?: boolean;
  hideBackButton?: boolean;
  logo?: string;
}

export function OrdersNavbar(props: Props) {
  const router = useRouter();
  const lang = useParams().lang;
  const i18n = useTranslations('ordersPage.labels.navbar');
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const {
    customerId,
    customerName,
    hideDrawer,
    className,
    hideBackButton,
    logo,
  } = props;
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
      onBackButton={
        hideBackButton ? undefined : () => router.replace(`/${lang}/dashboard`)
      }
      setDrawerOpen={setDrawerOpen}
      i18n={i18n}
    />
  );
}
