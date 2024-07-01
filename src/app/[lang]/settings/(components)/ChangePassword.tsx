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

import { isPasswordValid } from '@/utils/functions';
import { ComponentProps, UserDataProps } from '@/typing/props';
import { useTokenContext } from '@/context/TokenContext';

interface Props extends UserDataProps, ComponentProps {}

export function ChangePassword(props: Props) {
  const { userData, className } = props;
  const token = useTokenContext();
  const i18n = useTranslations('settingsPage.labels.accountUpdate');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isCurrentPasswordVisible, setCurrentPasswordVisibility] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setNewPasswordVisibility] =
    useState<boolean>(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (errorMessage !== '') setErrorMessage('');
    if (successMessage !== '') setSuccessMessage('');

    //const data = new FormData(event.currentTarget);
    //const currentPassword = data.get('currentPassword');
    //const newPassword = data.get('newPassword');

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
        title={i18n('changePassword')}
        icon={<Iconify icon="mdi:password" width={22} className="mr-3" />}
      />
      <div className="p-4">
        <Grid container component="form" onSubmit={handleSubmit} spacing={2}>
          <Grid item xs={12}>
            {userData ? (
              <TextField
                fullWidth
                required
                name="currentPassword"
                label={i18n('currentPassword')}
                size="small"
                value={currentPassword}
                onChange={event => {
                  if (errorMessage !== '') setErrorMessage('');
                  if (successMessage !== '') setSuccessMessage('');
                  setCurrentPassword(event.target.value);
                }}
                type={isCurrentPasswordVisible ? 'text' : 'password'}
                color={
                  currentPassword === ''
                    ? 'primary'
                    : currentPassword.length < 8
                    ? 'error'
                    : 'success'
                }
                InputProps={{
                  autoComplete: 'new-password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        title={
                          isCurrentPasswordVisible
                            ? i18n('hidePassword')
                            : i18n('showPassword')
                        }
                        aria-label={i18n('showHidePassword')}
                        onMouseDown={event => {
                          event.preventDefault();
                          setCurrentPasswordVisibility(
                            visibility => !visibility
                          );
                        }}
                      >
                        {
                          <Iconify
                            className="text-foreground/45"
                            icon={
                              isCurrentPasswordVisible
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
              <TextField
                fullWidth
                required
                name="newPassword"
                label={i18n('newPassword')}
                size="small"
                value={newPassword}
                onChange={event => {
                  setNewPassword(event.target.value);
                  if (errorMessage !== '') setErrorMessage('');
                  if (successMessage !== '') setSuccessMessage('');
                }}
                type={isNewPasswordVisible ? 'text' : 'password'}
                color={
                  newPassword === ''
                    ? 'primary'
                    : isPasswordValid(newPassword)
                    ? 'success'
                    : 'error'
                }
                InputProps={{
                  autoComplete: 'off',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        title={
                          isNewPasswordVisible
                            ? i18n('hidePassword')
                            : i18n('showPassword')
                        }
                        aria-label={i18n('showHidePassword')}
                        onMouseDown={event => {
                          event.preventDefault();
                          setNewPasswordVisibility(visibility => !visibility);
                        }}
                      >
                        {
                          <Iconify
                            className="text-foreground/45"
                            icon={
                              isNewPasswordVisible
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
              <TextField
                fullWidth
                required
                name="confirmNewPassword"
                label={i18n('confirmNewPassword')}
                size="small"
                value={confirmNewPassword}
                onChange={event => {
                  if (errorMessage !== '') setErrorMessage('');
                  if (successMessage !== '') setSuccessMessage('');
                  setConfirmNewPassword(event.target.value);
                }}
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                color={
                  confirmNewPassword === ''
                    ? 'primary'
                    : isPasswordValid(confirmNewPassword)
                    ? 'success'
                    : 'error'
                }
                InputProps={{
                  autoComplete: 'off',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        title={
                          isConfirmPasswordVisible
                            ? i18n('hidePassword')
                            : i18n('showPassword')
                        }
                        aria-label={i18n('showHidePassword')}
                        onMouseDown={event => {
                          event.preventDefault();
                          setConfirmPasswordVisibility(
                            visibility => !visibility
                          );
                        }}
                      >
                        {
                          <Iconify
                            className="text-foreground/45"
                            icon={
                              isConfirmPasswordVisible
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
                disabled={
                  currentPassword.length < 8 ||
                  !isPasswordValid(newPassword) ||
                  !isPasswordValid(confirmNewPassword) ||
                  newPassword !== confirmNewPassword
                }
              >
                {i18n('changePassword')}
              </Button>
            ) : (
              <Skeleton width="100%" height={35} />
            )}
          </Grid>
        </Grid>
        {((newPassword !== '' && !isPasswordValid(newPassword)) ||
          (confirmNewPassword !== '' &&
            !isPasswordValid(confirmNewPassword))) && (
          <StatusMessage type="error">{i18n('invalidPassword')}</StatusMessage>
        )}
        {newPassword !== '' &&
          confirmNewPassword !== '' &&
          confirmNewPassword !== newPassword && (
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
      </div>
    </Card>
  );
}
