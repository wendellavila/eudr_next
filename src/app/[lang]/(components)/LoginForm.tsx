'use client';
import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Grid,
  Link,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { BannerScrollProps } from '@/typing/props';
import { Iconify } from '@/components/Iconify';

import { isEmailValid } from '@/utils/functions';
import { StatusMessage } from '@/components/StatusMessage';
import { useTokenContext } from '@/context/TokenContext';
import { dummyUserData } from '@/utils/data';

interface AuthData {
  token: string;
}

function Form(props: BannerScrollProps) {
  const router = useRouter();
  const lang = useParams().lang;
  const i18n = useTranslations('loginPage.labels.login');
  const searchParams = useSearchParams();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { registerRef } = props;

  const token = useTokenContext();

  const oid: string | null = searchParams.get('oid');
  let newSearchParams: URLSearchParams | undefined = undefined;

  if (oid) {
    newSearchParams = new URLSearchParams();
    newSearchParams.set('oid', oid);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);
    //const email = data.get('email');
    //const password = data.get('password');

    if (data.get('rememberMe')) {
      localStorage.setItem('eudr_auth_token', 'dummy_token');
    } else {
      sessionStorage.setItem('eudr_auth_token', 'dummy_token');
    }
    // addeventlistener for storage is not triggered on the page that changes the storage
    // manual event dispatch is needed.
    window.dispatchEvent(new Event('storage'));
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      const userData = dummyUserData;

      if (userData.role === 'admin') {
        router.replace(`/${lang}/dashboard`);
        if (newSearchParams) {
          router.push(`/${lang}/orders`);
          router.push(`/${lang}/report?${newSearchParams}`);
        }
      } else {
        router.replace(`/${lang}/orders`);
        if (newSearchParams) {
          router.push(`/${lang}/report?${newSearchParams}`);
        }
      }
    } else {
      router.prefetch(`/${lang}/dashboard`);
      router.prefetch(`/${lang}/orders`);
      if (newSearchParams) {
        router.prefetch(`/${lang}/report?${newSearchParams}`);
      }
    }
  }, [i18n, token, router, lang, newSearchParams]);

  return (
    <form onSubmit={handleSubmit}>
      <Typography component="h2" variant="h5" className="text-center">
        {i18n('title')}
      </Typography>
      <TextField
        required
        fullWidth
        color={
          email == '' ? 'primary' : isEmailValid(email) ? 'success' : 'error'
        }
        id="email"
        name="email"
        label={i18n('emailAddress')}
        variant="outlined"
        margin="normal"
        InputProps={{
          autoComplete: 'email',
        }}
        onChange={event => setEmail(event.target.value)}
      />
      <TextField
        required
        fullWidth
        color={
          password == ''
            ? 'primary'
            : password.length >= 8
            ? 'success'
            : 'error'
        }
        id="password"
        name="password"
        label={i18n('password')}
        variant="outlined"
        margin="normal"
        type={isPasswordVisible ? 'text' : 'password'}
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
                  setPasswordVisibility(
                    currentPasswodVisibility => !currentPasswodVisibility
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
        onChange={event => setPassword(event.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox value="remember" color="primary" name="rememberMe" />
        }
        label={i18n('rememberMe')}
      />
      {errorMessage && (
        <StatusMessage type="error">{errorMessage}</StatusMessage>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="mt-6 mb-4"
        disabled={!isEmailValid(email) || password.length < 8}
      >
        {isLoading ? (
          <Iconify icon="svg-spinners:ring-resize" width={25} />
        ) : (
          i18n('title')
        )}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            {i18n('forgotPassword')}
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="#about-register"
            onClick={event => {
              event.preventDefault();
              registerRef.current?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            className="text-primary"
          >
            <Typography variant="body2">{i18n('signUp')}</Typography>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export function LoginForm(props: BannerScrollProps) {
  const i18n = useTranslations('loginPage.labels.login');
  const [hasScript, setScript] = useState<boolean | undefined>(false);

  useEffect(() => setScript(true), []);

  return hasScript ? (
    // Suspense is required when using useSearchParams
    <Suspense fallback={<></>}>
      <Form {...props} />
    </Suspense>
  ) : (
    <StatusMessage type="error" className="animate-fade animate-delay-1000">
      {i18n('noScript')}
    </StatusMessage>
  );
}
