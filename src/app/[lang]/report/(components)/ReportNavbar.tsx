'use client';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { useRouter, useParams } from 'next/navigation';
import { ComponentProps } from '@/typing/props';

interface Props extends ComponentProps {
  titleAppend?: string;
}

export function ReportNavbar(props: Props) {
  const router = useRouter();
  const lang = useParams().lang;
  const i18n = useTranslations('reportPage.labels.navbar');
  const { titleAppend, className } = props;

  return (
    <Navbar
      className={className}
      titleAppend={titleAppend}
      i18n={i18n}
      onBackButton={() => router.replace(`/${lang}/orders`)}
    />
  );
}
