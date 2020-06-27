import baseStyled, { ThemedStyledInterface } from 'styled-components';

const colors = {
  grey100: '#202020' as '#202020',
  grey200: '#585858',
  grey300: '#757575',
  grey400: '#BDBDBD',
  grey500: '#E2E2E2',
  grey600: '#E9E9E9',
  grey700: '#F3F3F3',
  grey800: '#F8f8f8',
};

const Theme = {
  colors,
  layout: {
    base: '16px',
    base2: '32px',
    base3: '48px',
    base4: '64px',
    base5: '80px',
    base6: '96px',
    base7: '112px',
    base8: '128px',
    base9: '144px',
    base10: '160px',
  },

  button: {
    fontSize: '1rem',
    fontSizeSmall: '0.8rem',
    padding: {
      medium: '0.6rem 0.8rem',
    },
    primary: {
      default: {
        color: colors.grey500,
        bgColor: colors.grey100,
        border: 0,
        ['border-radius']: 0,
      },
      hover: {
        color: colors.grey800,
      },
    },
    outline: {
      default: {
        color: colors.grey100,
        bgColor: '#fff',
        border: `2px solid ${colors.grey100}`,
      },
      hover: {
        color: colors.grey800,
        bgColor: 'red',
      },
    },
  },
};

// export type TTheme = typeof Theme;
// export const styled = baseStyled as ThemedStyledInterface<TTheme>;

export default Theme;
