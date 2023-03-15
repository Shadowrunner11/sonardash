import { createTheme } from '@mui/material'
import { defaultTheme } from 'react-admin'

export const darkTheme = createTheme({
  ...defaultTheme,
  palette: { mode: 'dark' },
})
