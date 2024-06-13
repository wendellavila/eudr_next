'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { LanguageSelector } from '@/components/LanguageSelector';
import { SetState } from '@/typing/types';
import { ChangePasswordModal } from './ChangePasswordModal';
import { basePath } from '@/utils/constants';

interface NavbarDrawerProps {
  customerName: string;
  isDrawerOpen: boolean;
  setDrawerOpen: SetState<boolean>;
}

export function NavbarDrawer(props: NavbarDrawerProps) {
  const { customerName, isDrawerOpen, setDrawerOpen } = props;

  const i18n = useTranslations('ordersPage.labels.drawer');
  const router = useRouter();
  const lang = useParams().lang;
  const [isPasswordModalOpen, setPasswordModalOpen] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    router.replace(`/${lang}`);
  };

  const handlePasswordChange = async () => {
    setDrawerOpen(false);
    // Delay to wait for drawer to close
    setTimeout(() => setPasswordModalOpen(true), 200);
  };

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <List className="w-[350px] h-full flex flex-col py-0">
          <div
            className="flex flex-col items-center pt-7 pb-6
            justify-center relative bg-primary"
          >
            <Image
              src={`${basePath}/cafe-grao.jpg`}
              alt="Logo"
              fill={true}
              sizes="350px"
              className="object-cover"
            />
            <div className="bg-yellow-900/25 w-full h-full absolute top-0 left-0"></div>
            <div className="bg-black/25 w-full h-full absolute top-0 left-0"></div>
            <Avatar
              alt="Customer Logo"
              className="h-[100px] w-[100px] border-1 border-solid shadow-sm border-white"
            ></Avatar>
            <Typography
              variant="h5"
              className="text-center pt-4 drop-shadow-sm text-white"
            >
              {customerName}
            </Typography>
          </div>
          <nav className="flex flex-col justify-center mt-4">
            <ListItem className="p-0" onClick={handlePasswordChange}>
              <ListItemButton className="py-4 px-6 flex flex-row justify-center">
                <Iconify
                  icon="mdi:password-outline"
                  width={20}
                  className="mr-2"
                />
                {i18n('changePassword')}
              </ListItemButton>
            </ListItem>
            <ListItem className="p-0" onClick={handleLogout}>
              <ListItemButton className="py-4 px-6 flex flex-row justify-center">
                <Iconify
                  icon="material-symbols:exit-to-app"
                  width={20}
                  className="mr-2"
                />
                {i18n('logout')}
              </ListItemButton>
            </ListItem>
          </nav>
          <div className="grow"></div>
          <div className="px-4 pb-4 flex flex-row justify-center mt-4">
            <LanguageSelector />
          </div>
        </List>
      </Drawer>
      <ChangePasswordModal
        isPasswordModalOpen={isPasswordModalOpen}
        setPasswordModalOpen={setPasswordModalOpen}
      />
    </>
  );
}
