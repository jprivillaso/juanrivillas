// ==================================================
// Variables
//
// 1. Spaces
// 2. Colors
// 3. zIndex
// 4. Misc
// ==================================================

// --------------------------------------------------
// 1. Spaces
// --------------------------------------------------

export const Space = {
  xxs: `.4rem`,
  xs: `.8rem`,
  sm: `1.6rem`,
  default: `2.4rem`,
  md: `3.2rem`,
  lg: `4.8rem`,
  xlg: `6.4rem`,
  xxlg: `9.6rem`,
};

export const Height = {
  headerSm: `${ Space.lg }`,
  headerLg: `${ Space.xlg }`,
  footer: `4rem`,
  mainTop: `${ Space.md }`
};

// --------------------------------------------------
// 2. Colors
// --------------------------------------------------

export const Color = {
  white: 'rgba(255, 255, 255, .9)',
  brown: '#4F484B',
  red: '#E1332D',
  whiteSolid: '#ffffff',
  blackSolid: '#000000',
  blue: '#68A9B2',
  blueLight: '#a1ecf7',
  grayDarker: '#1d1d1d',
  grayDark: '#2d2d2d',
  gray: '#757575',
  grayLight: '#aaaaaa',
  grayLighter: '#efefef',
  grayWhite: '#f1f1f1',
  yellow: '#e6af05',
  orangeLight: '#FFAD6F',
  devops: '#38A69B',
  random: '#FF3F63',
  carreira: '#F28C0F',
  liderança: '#07D9B2',
  js: '#F28C0F',
  default: '#F28C0F',
  algoritmos: '#F2D852',
  arquitetura: '#CC0066'
};

// --------------------------------------------------
// 3. zIndex
// --------------------------------------------------

export const ZIndex = {
  bg: `-1`,
  default: `1`,
  footer: `5`,
  header: `5`,
};

// --------------------------------------------------
// 4. Misc
// --------------------------------------------------

export const Transition = {
  default: `.25s`,
};

export const BorderRadius = {
  box: `2px`,
};

export const Border = {
  box: `1px solid var(--borderColor)`,
  default: `1px solid var(--borderColor)`,
};

export const BoxShadow = {
  box: `0 1px 3px var(--boxShadow)`,
};

export const MaxSize = {
  md: `750px`,
  lg: `1080px`,
};
