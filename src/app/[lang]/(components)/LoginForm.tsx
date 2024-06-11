'use client';
import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Box,
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
import { Iconify } from '@/components/Iconify';

export function LoginForm() {
  const router = useRouter();
  const lang = useParams().lang;
  const i18n = useTranslations('loginPage.labels.login');
  const searchParams = useSearchParams();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [isPasswordInputFocused, setPasswordInputFocus] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const oid: string | null = searchParams.get('redirect');
  let newSearchParams: URLSearchParams | undefined = undefined;
  if (oid) {
    newSearchParams = new URLSearchParams();
    newSearchParams.set('oid', oid);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginSuccessful = true;

    if (loginSuccessful) {
      const token = 'placeholder';
      if (data.get('rememberMe')) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      router.replace(`/${lang}/home`);
      if (newSearchParams) router.push(`/${lang}/report?${newSearchParams}`);
    } else {
      setErrorMessage('Invalid credentials.');
    }
  };

  useEffect(() => {
    router.prefetch(`/${lang}/home`);
    if (newSearchParams) {
      router.prefetch(`/${lang}/report?${newSearchParams}`);
    }
  }, [router, lang, newSearchParams]);

  return (
    <Suspense>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography component="h2" variant="h5" className="text-center">
          {i18n('title')}
        </Typography>
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          label={i18n('emailAddress')}
          variant="outlined"
          margin="normal"
          autoComplete="email"
          onChange={event => setEmail(event.target.value)}
        />
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          label={i18n('password')}
          variant="outlined"
          margin="normal"
          type={isPasswordVisible ? 'text' : 'password'}
          autoComplete="current-password"
          InputProps={{
            // <-- This is where the toggle button is added.
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
                      className={`${
                        isPasswordInputFocused
                          ? 'text-primary'
                          : 'text-foreground/45'
                      }`}
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
          onFocus={() => setPasswordInputFocus(true)}
          onBlur={() => setPasswordInputFocus(false)}
          onChange={event => setPassword(event.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox value="remember" color="primary" name="rememberMe" />
          }
          label={i18n('rememberMe')}
        />
        {errorMessage && (
          <div className="flex flex-row items-center mt-4">
            <Iconify
              icon="mdi:info-outline"
              width={18}
              className="mr-1 text-red-600"
            />
            <Typography variant="body1" className="text-red-600">
              {errorMessage}
            </Typography>
          </div>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-6 mb-4"
          disabled={password.length < 8 || !/^\S+@\S+$/.test(email)}
        >
          {i18n('title')}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              {i18n('forgotPassword')}
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {i18n('signUp')}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Suspense>
  );
}
