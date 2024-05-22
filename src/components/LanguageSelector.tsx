'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Icon } from '@iconify/react';

export function LanguageSelector() {
  const router = useRouter();
  const locale = useLocale();
  let pathname = usePathname();

  const languageItems = [
    { lang: 'en', name: 'English', icon: 'flagpack:gb-ukm' },
    { lang: 'pt', name: 'Português', icon: 'flagpack:br' },
  ];

  return (
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
          <Icon icon={item.icon} width={20} className="mr-2" />
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
}
