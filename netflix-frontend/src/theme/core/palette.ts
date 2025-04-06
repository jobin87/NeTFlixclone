import type { ColorSystemOptions } from '@mui/material/styles';

import COLORS from './colors.json';
import { varAlpha, createPaletteChannel } from '../styles';

// GREY
export const grey = createPaletteChannel(COLORS.grey);

// PALETTE COLORS
export const primary = createPaletteChannel(COLORS.primary);
export const secondary = createPaletteChannel(COLORS.secondary);
export const info = createPaletteChannel(COLORS.info);
export const success = createPaletteChannel(COLORS.success);
export const warning = createPaletteChannel(COLORS.warning);
export const error = createPaletteChannel(COLORS.error);
export const common = createPaletteChannel(COLORS.common);

// TEXT
export const text = createPaletteChannel({
  primary: '#FFFFFF',
  secondary: grey[500],
  disabled: grey[600],
});

// BACKGROUND
export const background = createPaletteChannel({
  paper: grey[800],
  default: "#000000",
  neutral: '#28323D',
});

// ACTIONS
const baseAction = {
  hover: varAlpha(grey['500Channel'], 0.08),
  selected: varAlpha(grey['500Channel'], 0.16),
  focus: varAlpha(grey['500Channel'], 0.24),
  disabled: varAlpha(grey['500Channel'], 0.8),
  disabledBackground: varAlpha(grey['500Channel'], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

export const action = {
  ...baseAction,
  active: grey[500],
};

// FINAL DARK PALETTE
export const darkPalette = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: varAlpha(grey['500Channel'], 0.2),
  text,
  background,
  action,
};

// EXPORT ONLY DARK
export const colorSchemes: Partial<Record<'dark', ColorSystemOptions>> = {
  dark: {
    palette: darkPalette,
  },
};
