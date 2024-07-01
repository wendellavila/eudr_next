'use client';
import Image from 'next/image';
import { Iconify } from '@/components/Iconify';
import { i18nConfig } from '@/config/i18n';
import { useRouter } from 'next/navigation';
import { deployPath } from '@/utils/constants';
import { basePath } from '@/utils/constants';

interface Props {
  id?: string;
}

export function RootLoadingScreen(props: Props) {
  const router = useRouter();

  const { id } = props;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    router.replace(`/${i18nConfig.defaultLocale}`);
  };

  return (
    <section
      id={id}
      className="flex flex-col items-center justify-center
      bg-white min-h-[100vh]"
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
        className="text-tertiary"
      />
      <p className="text-sm absolute bottom-3 animate-fade animate-delay-1000">
        Not redirected?{` `}
        <a
          href={`${deployPath}/en`}
          className="underline text-primary"
          onClick={handleClick}
        >
          Click here
        </a>
        {` `}to go to the front page.
      </p>
    </section>
  );
}
