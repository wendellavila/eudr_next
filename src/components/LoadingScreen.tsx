'use client';
import Image from 'next/image';
import { Iconify } from '@/components/Iconify';
import { i18nConfig } from '@/config/i18n';
import { useParams, useRouter } from 'next/navigation';
import { deployPath } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import { basePath } from '@/utils/constants';

interface Props {
  id?: string;
}

export function LoadingScreen(props: Props) {
  const router = useRouter();
  const lang = useParams().lang;

  const i18n = useTranslations('loadingScreen.labels');

  const { id } = props;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    router.replace(`/${i18nConfig.defaultLocale}`);
  };

  return (
    <section
      id={id}
      className="bg-white min-h-[100vh] flex flex-col items-center justify-center"
    >
      <Image
        width={100}
        height={65}
        src={`${basePath}/logo.svg`}
        alt="Logo"
        className="mb-10 w-auto h-[100px]"
        priority={true}
      />
      <Iconify
        icon="svg-spinners:3-dots-fade"
        width={40}
        className="text-avocado-400"
      />
      <p className="text-sm absolute bottom-3 animate-fade animate-delay-1000">
        {`${i18n('notRedirected')} `}
        <a
          href={`${deployPath}/${lang}/`}
          className="underline text-primary"
          onClick={handleClick}
        >
          {i18n('clickHere')}
        </a>
        {` ${i18n('goToFrontPage')}`}
      </p>
    </section>
  );
}
