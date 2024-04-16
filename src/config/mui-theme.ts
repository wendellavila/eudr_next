import { archivo } from './fonts';
import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
        buttonWhite: Palette['primary'];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
        buttonWhite?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Switch' {
    interface SwitchPropsColorOverrides {
        tertiary: true;
        buttonWhite: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        tertiary: true;
        buttonWhite: true;
    }
}

declare module '@mui/material/Grid' {
    interface GridPropsColorOverrides {
        tertiary: true;
    }
}

export const theme = createTheme({
    typography: {
        'fontFamily': archivo.style.fontFamily
    },
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&& .MuiTouchRipple-child': {
                        backgroundColor: '#c9b69f'
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&& .MuiTouchRipple-child": {
                        backgroundColor: '#c9b69f'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    "&& .MuiTouchRipple-child": {
                        backgroundColor: '#c9b69f'
                    }
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&& .MuiTouchRipple-child": {
                        backgroundColor: '#c9b69f'
                    }
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#74533b',
            light: '#74533b',
            dark: '#74533b',
            contrastText: '#fff',
        },
        secondary: {
            main: '#e3d5cc',
            light: '#e3d5cc',
            dark: '#e3d5cc',
            contrastText: '#1d1b19',
        },
        tertiary: {
            main: '#A0BF7F',
            light: '#A0BF7F',
            dark: '#A0BF7F',
            contrastText: '#fff',
        },
        buttonWhite: {
            main: '#ffffff',
            light: '#ffffff',
            dark: '#ffffff',
            contrastText: '#1d1b19',
            
        },
    }
});