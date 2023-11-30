import { createTheme } from '@mui/material/styles';
import { components } from 'src/config/theme/components';
import { lightThemePalette } from 'src/config/theme/palette';
import React from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    input: Palette['primary'];
  }
  interface TypographyVariants {
    primary: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    primary?: React.CSSProperties;
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    input?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    primary: true;
  }
}

const getTheme = (mode: 'light' | 'dark') =>
    createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 768,
          lg: 1200,
          xl: 1440
        }
      },
      palette: lightThemePalette,
      typography: {
        fontFamily: '"Wix Madefor Display", sans-serif',
        fontSize: 16,
        h1: { fontSize: '40px', fontWeight: '700', lineHeight: '50.4px' },
        h2: { fontSize: '28px', fontWeight: '700', lineHeight: '44.8px' },
        h3: { fontSize: '22px', fontWeight: '700', lineHeight: '27.72px' },
        h4: { fontSize: '16px', fontWeight: '700', lineHeight: '20.16px' },
        body1: { fontSize: '16px', fontWeight: '400', lineHeight: '160%' },
        subtitle1: { fontSize: '14px', fontWeight: '400', lineHeight: '22.4px' },
        subtitle2: { fontSize: '12px', fontWeight: '400', lineHeight: '16.8px' },
      },
      components: components(mode)
    });

export default getTheme;
