import type { PaletteMode } from '@mui/material'
import { defaultTheme } from 'react-admin'

export const darkTheme = {
  ...defaultTheme,
  palette: {
    mode: 'dark' as PaletteMode,
  },
}
