import Scrollbars from 'react-custom-scrollbars-2';
import { useRouter, useParams } from 'next/navigation';

import { SettingsNavbar } from './SettingsNavbar';
import { CopyrightText } from '@/components/CopyrightText';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';

import { UserProfile } from '@/components/UserProfile';
import { Grid } from '@mui/material';
import { useUserDataContext } from '@/context/UserDataContext';

export function SettingsLoader() {
  const router = useRouter();
  const lang = useParams().lang;

  const userData = useUserDataContext();

  const handleHomeButton = () => {
    if (userData && userData.role === 'admin')
      router.replace(`/${lang}/dashboard`);
    else router.replace(`/${lang}/orders`);
  };

  return (
    <>
      <SettingsNavbar className="flex lg:hidden" userData={userData} />
      <div className="flex flex-row grow">
        <UserProfile
          card
          hideSettings
          className="hidden lg:flex h-screen"
          logo={userData ? userData.logo : undefined}
          customerId={userData ? userData.customerId : undefined}
          customerName={userData ? userData.customerName : undefined}
          onHomeButton={handleHomeButton}
        />
        <main className="flex flex-col grow">
          <SettingsNavbar className="hidden lg:flex" userData={userData} />
          <Scrollbars universal className="flex flex-col">
            <div className="flex flex-col px-4 lg:px-8 justify-between min-h-full grow">
              <Grid
                container
                justifyContent="center"
                className="pt-4 lg:pt-8"
                spacing={2}
              >
                <Grid item xs={12} md={6} xl={4}>
                  <ChangeEmail
                    userData={userData}
                    className="w-full lg:max-w-[800px]"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <ChangePassword
                    userData={userData}
                    className="w-full lg:max-w-[800px]"
                  />
                </Grid>
              </Grid>
              <CopyrightText className="mt-4 mb-2" />
            </div>
          </Scrollbars>
        </main>
      </div>
    </>
  );
}
