import { Card, Grid } from '@mui/material';
import { CardHeader } from '@/components/CardHeader';
import { Iconify } from '@/components/Iconify';
import { useTranslations } from 'next-intl';
import { GenerateLink } from './GenerateLink';
import { CreateAccount } from './CreateAccount';
import { useTokenContext } from '@/context/TokenContext';
import { dummyCustomerList } from '@/utils/data';

export function AccountCreationLoader() {
  const i18n = useTranslations('dashboardPage.labels');
  const token = useTokenContext();

  const customerList = dummyCustomerList;

  return (
    customerList && (
      <>
        <Grid item xs={12} md={6} xl={4}>
          <Card className="h-full flex flex-col animate-fade-up">
            <CardHeader
              title={i18n('createAccount')}
              icon={
                <Iconify
                  icon="mdi:account-plus-outline"
                  className="mr-3"
                  width={22}
                />
              }
            />
            <CreateAccount customerList={customerList} className="grow" />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Card className="h-full flex flex-col animate-fade-up">
            <CardHeader
              title={i18n('generateAccountCreationLink')}
              icon={<Iconify icon="tdesign:link" className="mr-3" width={22} />}
            />
            <GenerateLink customerList={customerList} className="grow" />
          </Card>
        </Grid>
      </>
    )
  );
}
