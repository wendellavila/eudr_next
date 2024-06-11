import type { Config } from 'tailwindcss';

// Adding default tailwind colors
const colors = require('tailwindcss/colors');
// Removing deprecated color names
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // Same as MUI
      xs: '0px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      colors: {
        foreground: '#1d1b19',
        primary: '#74533b',
        primaryDark: '#503629',
        secondary: ' #EADAD0',
        tertiary: ' #A0BF7F',
        surface: '#eef0e8',
        ...colors,
      },
    },
  },
  plugins: [require('tailwindcss-patterns'), require('tailwindcss-animated')],
  corePlugins: {
    preflight: false,
  },
  mode: 'jit',
};
export default config;
