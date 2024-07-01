'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
} from '@mui/material';

import { StatusMessage } from '@/components/StatusMessage';
import { CardHeader } from '@/components/CardHeader';
import { Iconify } from '@/components/Iconify';

import { isEmailValid } from '@/utils/functions';
import { ComponentProps, UserDataProps } from '@/typing/props';
import { baseUrl } from '@/utils/constants';
import { useTokenContext } from '@/context/TokenContext';

interface Props extends UserDataProps, ComponentProps {}

export function ChangeEmail(props: Props) {
  const i18n = useTranslations('settingsPage.labels.accountUpdate');
  const { userData, className } = props;
  const token = useTokenContext();

  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (errorMessage !== '') setErrorMessage('');
    if (successMessage !== '') setSuccessMessage('');

    const data = new FormData(event.currentTarget);
    //const password = data.get('currentPassword');
    //const newEmail = data.get('newEmail');

    let success: string | undefined;
    let error: string | undefined;

    error = i18n('accountUpdateServiceUnavailable');

    setLoading(false);
    if (error) setErrorMessage(error);
    else if (success) setSuccessMessage(success);
  };

  return (
    <Card className={className}>
      <CardHeader
        title={i18n('changeEmail')}
        icon={<Iconify icon="ic:round-email" width={22} className="mr-3" />}
      />
      <div className="p-4">
        <Grid container component="form" onSubmit={handleSubmit} spacing={2}>
          <Grid item xs={12}>
            {userData ? (
              <TextField
                fullWidth
                name="currentEmail"
                disabled
                label={i18n('currentEmail')}
                size="small"
                InputProps={{
                  autoComplete: 'off',
                }}
                type="email"
                value={userData.email}
              />
            ) : (
              <Skeleton width="100%" height={35} />
            )}
          </Grid>
          <Grid item xs={12}>
            {userData ? (
              <TextField
                fullWidth
                required
                name="newEmail"
                label={i18n('newEmail')}
                size="small"
                InputProps={{
                  autoComplete: 'off',
                }}
                type="email"
                value={newEmail}
                onChange={event => {
                  if (errorMessage !== '') setErrorMessage('');
                  if (successMessage !== '') setSuccessMessage('');
                  setNewEmail(event.target.value);
                }}
                color={
                  newEmail === ''
                    ? 'primary'
                    : isEmailValid(newEmail)
                    ? 'success'
                    : 'error'
                }
              />
            ) : (
              <Skeleton width="100%" height={35} />
            )}
          </Grid>
          <Grid item xs={12}>
            {userData ? (
              <TextField
                fullWidth
                required
                name="currentPassword"
                label={i18n('currentPassword')}
                size="small"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={event => {
                  if (errorMessage !== '') setErrorMessage('');
                  if (successMessage !== '') setSuccessMessage('');
                  setPassword(event.target.value);
                }}
                color={
                  password === ''
                    ? 'primary'
                    : password.length < 8
                    ? 'error'
                    : 'success'
                }
                InputProps={{
                  autoComplete: 'new-password',
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
                          setPasswordVisibility(
                            currentPasswodVisibility =>
                              !currentPasswodVisibility
                          );
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
            ) : (
              <Skeleton width="100%" height={35} />
            )}
          </Grid>
          <Grid item xs={12}>
            {userData ? (
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!isEmailValid(newEmail) || password.length < 8}
              >
                {i18n('changeEmail')}
              </Button>
            ) : (
              <Skeleton width="100%" height={35} />
            )}
          </Grid>
        </Grid>
        {newEmail !== '' && !isEmailValid(newEmail) && (
          <StatusMessage type="error">{i18n('invalidEmail')}</StatusMessage>
        )}
        {errorMessage && (
          <StatusMessage type="error">{errorMessage}</StatusMessage>
        )}
        {successMessage && (
          <StatusMessage type="success">{successMessage}</StatusMessage>
        )}
      </div>
    </Card>
  );
}
