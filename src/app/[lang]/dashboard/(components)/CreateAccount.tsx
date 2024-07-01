import { useState } from 'react';
import { CustomerData } from '@/typing/types';
import { StatusMessage } from '@/components/StatusMessage';

import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { isEmailValid, isPasswordValid } from '@/utils/functions';
import { Iconify } from '@/components/Iconify';
import { ComponentProps } from '@/typing/props';
import { useTokenContext } from '@/context/TokenContext';

interface Props extends ComponentProps {
  customerList: CustomerData[];
}

export function CreateAccount(props: Props) {
  const i18n = useTranslations('dashboardPage.labels.accountCreation');
  const { customerList } = props;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  const [id, setId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [isPasswordConfirmVisible, setPasswordConfirmVisibility] =
    useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (errorMessage !== '') setErrorMessage('');
    if (successMessage !== '') setSuccessMessage('');

    const data = new FormData(event.currentTarget);

    //const email = data.get('email');
    //const password = data.get('password');
    let success: string | undefined;
    let error: string | undefined;

    error = i18n('accountCreationServiceUnavailable');

    setLoading(false);
    if (error) setErrorMessage(error);
    else if (success) setSuccessMessage(success);
  };
  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
      spacing={2}
      className="p-4"
    >
      <Grid item xs={12}>
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
            if (successMessage !== '') setSuccessMessage('');
            setId(value ? value.id : '');
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={email}
          required
          fullWidth
          color={
            email == '' ? 'primary' : isEmailValid(email) ? 'success' : 'error'
          }
          id="email"
          name="email"
          size="small"
          label={i18n('email')}
          variant="outlined"
          margin="normal"
          className="m-0 col-start-3 col-span-2"
          onChange={event => {
            if (errorMessage !== '') setErrorMessage('');
            if (successMessage !== '') setSuccessMessage('');
            setEmail(event.target.value);
          }}
          InputProps={{
            autoComplete: 'off',
          }}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          required
          fullWidth
          color={
            password == ''
              ? 'primary'
              : isPasswordValid(password)
              ? 'success'
              : 'error'
          }
          id="password"
          name="password"
          size="small"
          label={i18n('password')}
          variant="outlined"
          margin="normal"
          type={isPasswordVisible ? 'text' : 'password'}
          value={password}
          className="m-0 col-start-5 col-span-2"
          inputProps={{ className: 'border-green-500' }}
          onChange={event => {
            if (errorMessage !== '') setErrorMessage('');
            if (successMessage !== '') setSuccessMessage('');
            setPassword(event.target.value);
          }}
          InputProps={{
            autoComplete: 'off',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  title={
                    isPasswordVisible
                      ? i18n('hidePassword')
                      : i18n('showPassword')
                  }
                  aria-label={i18n('showHidePassword')}
                  onMouseDown={event => {
                    event.preventDefault();
                    setPasswordVisibility(visibility => !visibility);
                  }}
                >
                  {
                    <Iconify
                      className="text-foreground/45"
                      icon={
                        isPasswordVisible
                          ? 'material-symbols:visibility-off-outline'
                          : 'material-symbols:visibility-outline'
                      }
                    />
                  }
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          required
          fullWidth
          color={
            passwordConfirm == ''
              ? 'primary'
              : !isPasswordValid(passwordConfirm) ||
                passwordConfirm !== password
              ? 'error'
              : 'success'
          }
          id="password-confirm"
          name="password-confirm"
          size="small"
          label={i18n('confirmPassword')}
          variant="outlined"
          margin="normal"
          type={isPasswordConfirmVisible ? 'text' : 'password'}
          value={passwordConfirm}
          onChange={event => {
            if (errorMessage !== '') setErrorMessage('');
            if (successMessage !== '') setSuccessMessage('');
            setPasswordConfirm(event.target.value);
          }}
          className="m-0 col-start-7 col-span-2"
          InputProps={{
            autoComplete: 'off',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  title={
                    isPasswordConfirmVisible
                      ? i18n('hidePassword')
                      : i18n('showPassword')
                  }
                  aria-label={i18n('showHidePassword')}
                  onMouseDown={event => {
                    event.preventDefault();
                    setPasswordConfirmVisibility(visibility => !visibility);
                  }}
                >
                  {
                    <Iconify
                      className="text-foreground/45"
                      icon={
                        isPasswordConfirmVisible
                          ? 'material-symbols:visibility-off-outline'
                          : 'material-symbols:visibility-outline'
                      }
                    />
                  }
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={
            !isPasswordValid(passwordConfirm) ||
            password !== passwordConfirm ||
            !isEmailValid(email) ||
            !id ||
            isLoading
          }
          className="col-start-9 col-span-1"
        >
          {isLoading ? (
            <Iconify icon="svg-spinners:ring-resize" width={25} />
          ) : (
            i18n('create')
          )}
        </Button>
        {email !== '' && !isEmailValid(email) && (
          <StatusMessage type="error">{i18n('invalidEmail')}</StatusMessage>
        )}
        {password !== '' && !isPasswordValid(password) && (
          <StatusMessage type="error">{i18n('invalidPassword')}</StatusMessage>
        )}
        {password !== '' &&
          passwordConfirm !== '' &&
          passwordConfirm !== password && (
            <StatusMessage type="error">
              {i18n('passwordsDoNotMatch')}
            </StatusMessage>
          )}
        {errorMessage && (
          <StatusMessage type="error">{errorMessage}</StatusMessage>
        )}
        {successMessage && (
          <StatusMessage type="success">{successMessage}</StatusMessage>
        )}
      </Grid>
    </Grid>
  );
}
