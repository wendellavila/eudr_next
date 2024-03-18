'use client';
import { ReactNode } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  MenuItem,Select,SelectChangeEvent,Typography
} from '@mui/material';
import { Icon } from '@iconify/react';

import { CardHeaderProps } from '@/typing/props'

export function CardHeader(props: CardHeaderProps) : ReactNode {
	return (
		<div className="flex flex-row bg-stone-800 text-gray-50 px-5 py-2 items-center">
      {props.icon}
      <Typography variant="h6" component="h3">
        {props.title}
      </Typography>
    </div>
	);
}

export function LoadingScreen() : ReactNode {
	return (
		<section id="loading-screen"
      className="bg-white min-h-[100vh] flex flex-col items-center justify-center"
		>
			<div className="grow-[2]"></div>
			<img
				width={100}
				height={65}
				src={`/img/logo.svg`}
				alt="Logo"
				className="mb-10 w-auto h-[100px]"
			/>
			<Icon icon="svg-spinners:3-dots-fade" width={40} className="text-tertiary"/>
			<div className="grow-[3]"></div>
		</section>
	);
}
export function LanguageSelector() : ReactNode {
	const router = useRouter();
  const locale = useLocale();
	let pathname = usePathname();

	const languageItems = [
		{lang: 'en', name: 'English', icon: 'flagpack:gb-ukm'},
		{lang: 'pt', name: 'Português', icon: 'flagpack:br'}
	];
	return (
		<Select
			name="language"
			variant="outlined"
			size="small"
			value={locale}
			onChange={(event: SelectChangeEvent) => {
				pathname = `/${event.target.value}/${pathname.substring(3)}`;
				event.preventDefault();
				localStorage.setItem("lang", event.target.value);
				router.push(pathname);
			}}
		>
			{
				languageItems.map((item, index) => (
					<MenuItem key={index} value={item.lang}>
						<Icon icon={item.icon} width={20} className="mr-2"/>
						{item.name}
					</MenuItem>
				))
			}
		</Select>
	);
}