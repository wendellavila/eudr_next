'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Avatar, Card, ListItemButton } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ComponentProps } from '@/typing/props';
import { basePath } from '@/utils/constants';

interface Props extends ComponentProps {
  card?: boolean;
  logo?: string;
  customerName?: string;
  customerId?: string;
  onHomeButton?: () => void;
  hideSettings?: boolean;
  hideLogout?: boolean;
  showOrders?: boolean;
}

function UserProfileContent(props: Props) {
  const {
    logo,
    customerId,
    customerName,
    onHomeButton,
    hideSettings,
    hideLogout,
    showOrders,
  } = props;
  const i18n = useTranslations('ordersPage.labels.drawer');
  const router = useRouter();
  const lang = useParams().lang;

  const handleSettings = () => router.push(`/${lang}/settings`);

  const handleOrders = () => router.push(`/${lang}/orders`);

  const handleLogout = () => {
    localStorage.removeItem('eudr_auth_token');
    sessionStorage.removeItem('eudr_auth_token');
    router.replace(`/${lang}`);
  };

  const listItems: React.ReactNode[] = [];

  if (onHomeButton)
    listItems.push(
      <ListItemButton
        className="py-4 px-6 flex flex-row justify-center"
        onClick={onHomeButton}
      >
        <Iconify icon="mdi:home-outline" width={22} className="mr-2" />
        {i18n('home')}
      </ListItemButton>
    );

  if (showOrders)
    listItems.push(
      <ListItemButton
        className="py-4 px-6 flex flex-row justify-center"
        onClick={handleOrders}
      >
        <Iconify icon="mingcute:ship-line" width={22} className="mr-2" />
        {i18n('orders')}
      </ListItemButton>
    );

  if (!hideSettings)
    listItems.push(
      <ListItemButton
        className="py-4 px-6 flex flex-row justify-center"
        onClick={handleSettings}
      >
        <Iconify icon="mdi:account-cog-outline" width={22} className="mr-2" />
        {i18n('accountSettings')}
      </ListItemButton>
    );
  if (!hideLogout)
    listItems.push(
      <ListItemButton
        className="py-4 px-6 flex flex-row justify-center"
        onClick={handleLogout}
      >
        <Iconify icon="ic:exit-to-app" width={20} className="mr-2" />
        {i18n('logout')}
      </ListItemButton>
    );

  return (
    <>
      <div
        className="flex flex-col items-center pt-7 pb-6
        justify-center relative bg-coffee-400"
      >
        <Image
          src={`${basePath}/cafe-grao.jpg`}
          alt={i18n('coffeeBeans')}
          sizes="350px"
          className="object-cover"
          fill
          priority
        />
        <div className="bg-yellow-900/25 w-full h-full absolute top-0 left-0"></div>
        <div className="bg-black/25 w-full h-full absolute top-0 left-0"></div>
        <Avatar className="h-[100px] w-[100px] border-1 border-solid shadow-sm border-white">
          <Image
            src={logo ?? `${basePath}/user.webp`}
            alt={i18n('customerLogo')}
            width={100}
            height={100}
          />
        </Avatar>
        {customerName && (
          <span className="text-2xl text-center pt-4 drop-shadow-sm text-white">
            {customerName}
          </span>
        )}
      </div>
      <div className="flex flex-col justify-between grow">
        <nav className="flex flex-col justify-center mt-4">
          {listItems.map((item, index) => (
            <div
              key={`user-profile-item-${index}`}
              className={`animate-duration-300 ${
                index % 2 == 0 ? 'animate-fade-left' : 'animate-fade-right'
              }`}
            >
              {item}
            </div>
          ))}
        </nav>
        <div className="px-4 pb-4 flex flex-row justify-center mt-4">
          <LanguageSelector />
        </div>
      </div>
    </>
  );
}

export function UserProfile(props: Props) {
  const { card, className, ...otherProps } = props;
  const content = <UserProfileContent {...otherProps} />;

  const wrapperClassName = `w-[320px] h-full flex flex-col py-0 ${
    className ?? ''
  }`;
  return card ? (
    <Card className={`rounded-none ${wrapperClassName}`}>{content}</Card>
  ) : (
    <div className={wrapperClassName}>{content}</div>
  );
}
