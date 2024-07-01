'use client';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';

import { Navbar } from '@/components/Navbar';
import { ComponentProps, UserDataProps } from '@/typing/props';

interface Props extends UserDataProps, ComponentProps {}

export function SettingsNavbar(props: Props) {
  const { userData, className } = props;
  const router = useRouter();
  const lang = useParams().lang;
  const i18n = useTranslations('settingsPage.labels.navbar');

  const handleBackButton = () => {
    if (userData && userData.role === 'admin')
      router.replace(`/${lang}/dashboard`);
    else router.replace(`/${lang}/orders`);
  };

  return (
    <Navbar
      className={className}
      i18n={i18n}
      onBackButton={userData ? handleBackButton : undefined}
    />
  );
}
