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
        coffee: {
          50: '#FFF6EE',
          100: '#EADAD0',
          400: '#ad805f',
          600: '#74533B',
          700: '#503629',
        },
        avocado: {
          100: '#EEF0E8',
          200: '#d1d4c7',
          300: '#ABADA3',
          400: '#A0BF7F',
          700: '#649134',
        },
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
