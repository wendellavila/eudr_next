import { useState } from 'react';
import { CustomerData } from '@/typing/types';
import { useTranslations } from 'next-intl';

import { Autocomplete, Button, TextField } from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { StatusMessage } from '@/components/StatusMessage';
import { ComponentProps } from '@/typing/props';

interface Props extends ComponentProps {
  customerList: CustomerData[];
}

export function GenerateLink(props: Props) {
  const { customerList, className } = props;
  const i18n = useTranslations('dashboardPage.labels.accountCreation');

  const [isLoading, setLoading] = useState<boolean>(false);

  const [url, setUrl] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [id, setId] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (errorMessage !== '') setErrorMessage('');
    if (url !== '') setUrl('');

    let error: string | undefined;
    let signUpUrl: string | undefined;

    error = i18n('accountCreationServiceUnavailable');

    setLoading(false);
    if (error) setErrorMessage(error);
    else if (signUpUrl) setUrl(signUpUrl);
  };

  return (
    <form
      className={`flex flex-col h-full justify-evenly gap-y-4 p-4
          ${className ?? ''}`}
      onSubmit={handleSubmit}
    >
      <Autocomplete
        fullWidth
        color={id == '' ? 'primary' : 'success'}
        disablePortal
        size="small"
        options={customerList.map(customer => ({
          id: customer.customerId,
          label: `${customer.customerId} - ${customer.customerName}`,
        }))}
        renderInput={params => (
          <TextField {...params} label={i18n('customer')} />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_, value) => {
          if (errorMessage !== '') setErrorMessage('');
          if (url !== '') setUrl('');
          setId(value ? value.id : '');
        }}
      />
      <div>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!id || isLoading}
          className="col-start-9 col-span-1"
        >
          {isLoading ? (
            <Iconify icon="svg-spinners:ring-resize" width={25} />
          ) : (
            i18n('create')
          )}
        </Button>
        {errorMessage && (
          <StatusMessage type="error">{errorMessage}</StatusMessage>
        )}
        {url && (
          <>
            <StatusMessage type="success">
              {i18n('linkGenerated')}
            </StatusMessage>
            <TextField
              className="my-4"
              contentEditable={false}
              value={url}
              fullWidth
              size="small"
              label="Link"
            />
            <Button
              onClick={() => navigator.clipboard.writeText(url)}
              fullWidth
              color="buttonWhite"
              className="flex flex-row
              text-primary border border-solid border-primary"
            >
              <Iconify icon="mdi:content-copy" width={15} className="mr-1" />
              {i18n('copyToClipboard')}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
