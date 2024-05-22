'use client';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { ReportDataProps } from '@/typing/props';

export function ReportNavbar(props: ReportDataProps) {
  const { reportData } = props;
  const i18n = useTranslations('reportPage.labels.navbar');
  return (
    <Navbar
      titleAppend={reportData ? reportData.orderNumber : undefined}
      i18n={i18n}
    />
  );
}
