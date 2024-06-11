'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { deployPath } from '@/utils/constants';

export function LanguageSelector() {
  const router = useRouter();
  const locale = useLocale();
  let pathname = usePathname();

  const languageItems = [
    { lang: 'en', name: 'English', icon: 'flagpack:gb-ukm' },
    { lang: 'pt', name: 'Português', icon: 'flagpack:br' },
  ];

  const [hasScript, setScript] = useState(false);

  useEffect(() => setScript(true), []);

  return hasScript ? (
    <Select
      name="language"
      variant="outlined"
      size="small"
      value={locale}
      onChange={(event: SelectChangeEvent) => {
        pathname = `/${event.target.value}/${pathname.substring(4)}`;
        event.preventDefault();
        localStorage.setItem('lang', event.target.value);
        router.push(pathname);
      }}
    >
      {languageItems.map((item, index) => (
        <MenuItem key={index} value={item.lang}>
          <Iconify icon={item.icon} width={20} className="mr-2" />
          {item.name}
        </MenuItem>
      ))}
    </Select>
  ) : (
    <nav
      className="flex flex-col items-center gap-y-2 px-3 py-2 
        border border-solid rounded border-gray-300
        animate-fade animate-delay-1000"
    >
      {languageItems.map((item, index) => (
        <a
          key={index}
          href={`${deployPath}/${item.lang}/${pathname.substring(4)}`}
          className="flex flex-row justify-center flex-wrap
            no-underline hover:underline text-foreground"
        >
          <Iconify icon={item.icon} width={20} className="mr-1" />
          {item.name}
        </a>
      ))}
    </nav>
  );
}
