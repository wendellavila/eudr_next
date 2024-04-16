'use client';
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  Card,Grid,Link as MUILink,IconButton,MenuItem,Select,SelectChangeEvent,Skeleton,Typography
} from '@mui/material';
import { Icon } from '@iconify/react';

import { 
	CardHeaderProps,ListRowErrorMessageProps,ListRowProps,NavbarProps,
	Props,SkeletonLoaderProps,TabPanelProps
} from '@/typing/props';
import { companyName } from '@/utils/constants';

export function CopyrightText(props: {className?: string}){
	return (
		<article id="copyright">
			<Typography component="span" variant="body2" align="center"
				className={`flex flex-row justify-center ${props.className}`}
			>
				{`© ${new Date().getFullYear()}`}&nbsp;
				<MUILink color="inherit" href="#" underline="hover" target="_blank" className="block">
					{companyName.toUpperCase()}
				</MUILink>
			</Typography>
		</article>
	);
}

export function Navbar(props: NavbarProps){
  const router = useRouter();
	const hasDrawer = props.drawer && props.setDrawerOpen;

  return (
    <Card
      component="header"
      className="px-4 py-3 flex items-center rounded-none justify-between text-foreground z-10"
    >
      <IconButton
				className="mr-3 text-foreground"
				aria-label={props.i18n(hasDrawer ? 'menu' : 'goBack')}
				onClick={() => {
					if(hasDrawer && props.setDrawerOpen){
						props.setDrawerOpen(isOpen => !isOpen);
					}
					else {
						router.back();
					}
      	}}
			>
        <Icon icon={hasDrawer ? 'mdi:menu' : 'mdi:arrow-back'} width={22}/>
      </IconButton>
			{props.drawer}
      <Typography variant="h6" component="div" className="flex-grow">
				{props.i18n('title') + (props.titleAppend ? ` - ${props.titleAppend}` : '')}
      </Typography>
      <Image
        width={66}
        height={43}
        src="/logo.svg"
        alt="Logo"
        className="inline w-auto h-[30px]"
				priority={true}
      />
    </Card>
  );
}

export function ListRowHeader(props: Props) : ReactNode {
	return (
    <Grid container
      className="py-1 bg-neutral-100 border-neutral-200 border-b-[1px]
      border-t-0 border-x-0 border-solid"
    >
      {props.children}
    </Grid>
  );
}

export function TabPanel(props: TabPanelProps) : ReactNode {
	return (
		<div
			role="tabpanel"
			hidden={props.value !== props.index}
			id={`supplier-info-tabpanel-${props.index}`}
			aria-labelledby={`supplier-info-tab-${props.index}`}
		>
			{props.value === props.index && props.children}
		</div>
	);
}

export function ListRowErrorMessage(props: ListRowErrorMessageProps){
	const color = props.type === 'alert' ? 'text-blue-600' : 'text-red-600';

	return (
		<article id={props.id} className="py-2 flex flex-row items-center justify-center">
			<Icon icon="mdi:info-outline" className={`mr-1 ${color}`}/>
			<Typography variant="body2" className={color}>
				{props.message}
			</Typography>
		</article>
	);
}

export function SkeletonLoader(props: SkeletonLoaderProps) {
	return (
		<div id={props.id} className="pl-2 py-3">
			{
				props.children ? 
				props.children :
				<Skeleton
					width={props.width ?? 80}
					height={props.height ?? 20}
				/>
			}
		</div>
	);
}

export function ListRow(props: ListRowProps) : ReactNode {
  const ComponentWrapper = ('component' in props && props.component) ? props.component : 'div';
	const hasPanel = 'panel' in props;
	const hasHref = 'href' in props;
	const hasAction = hasPanel || hasHref;

	let className = `py-2 flex flex-row border-neutral-200 border-b-[1px]
	border-t-0 border-x-0 border-solid `;

	if(hasAction) className += 'hover:cursor-pointer hover:bg-stone-100 ';
	if(hasHref) className += 'text-inherit no-underline';

	return (
		<ComponentWrapper id={props.id}>
			{	hasHref &&
				<Link href={props.href} className={className}>
					{props.children}
				</Link>
			}
      {	!hasHref &&
				<div
					onClick={
						() => {
							if(hasPanel){
								props.setPanelState(isOpen => !isOpen);
							}
						}
					}
					className={className}
				>
					{props.children}
				</div>
			}
      { hasPanel && props.isOpen === true &&
        <div className={`p-4 bg-[#abada3]`}>
          {props.panel}
        </div>
      }
	  </ComponentWrapper>
	);
}

export function LoadingSection(props: {id?: string, className?: string}) : ReactNode {
	return (
		<div
      className={`h-[200px] flex flex-row items-center justify-center py-4 ${props.className}`}>
			<Icon icon="svg-spinners:ring-resize" width={40} className="text-primary"/>
		</div>
	);
}

export function CardHeader(props: CardHeaderProps) : ReactNode {
	return (
		<div className="flex flex-row bg-stone-800 text-gray-50 px-4 py-2 items-center">
      {props.icon}
      <Typography variant="h6" component="h3">
        {props.title}
      </Typography>
      { props.actions &&
      <>
        <div className="grow"></div>
        {props.actions}
      </>
      }
    </div>
	);
}

export function LoadingScreen(props: {id?: string}) : ReactNode {
	return (
		<section id={props.id}
      className="bg-white min-h-[100vh] flex flex-col items-center justify-center"
		>
			<div className="grow-[2]"></div>
			<Image
				width={100}
				height={65}
				src="/logo.svg"
				alt="Logo"
				className="mb-10 w-auto h-[100px]"
				priority={true}
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
				pathname = `/${event.target.value}/${pathname.substring(4)}`;
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