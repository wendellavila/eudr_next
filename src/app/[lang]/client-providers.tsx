'use client';
import { ComponentProps } from '@/typing/props';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';

import { theme } from '@/config/mui-theme';

export function ClientProviderLoader({ children }: ComponentProps) {
  return (
    //Prioritizing Tailwind over MUI styles
    <StyledEngineProvider injectFirst>
      {/* Mui Theme */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}
