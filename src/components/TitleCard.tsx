import Image from 'next/image';
import { ComponentProps } from '@/typing/props';
import { Card } from '@mui/material';
import { I18n } from '@/typing/types';
import { basePath } from '@/utils/constants';

interface Props extends ComponentProps {
  titleAppend?: string | undefined;
  i18n: I18n;
}

export function TitleCard(props: Props) {
  const { className, titleAppend, i18n } = props;
  return (
    <Card
      component="header"
      className={`px-5 py-4 mt-6 mb-2 flex items-center justify-between
    text-foreground z-10 ${className ?? ''}`}
    >
      <div className="text-xl font-medium grow">
        <span>{i18n('title') + (titleAppend ? ` - ${titleAppend}` : '')}</span>
      </div>
      <Image
        width={66}
        height={43}
        src={`${basePath}/logo.svg`}
        alt="Logo"
        className="inline w-auto h-[30px]"
        priority={true}
      />
    </Card>
  );
}
