import { AppBarProps, AppBar as RAAppBar, ToggleThemeButton, defaultTheme } from 'react-admin'
import { Box, Typography } from '@mui/material'
import { darkTheme } from '@config/theme'

export const AppBar = (props: AppBarProps) => (
  <RAAppBar {...props}>
    <Box flex='1'>
      <Typography variant='h6' id='react-admin-title'></Typography>
    </Box>
    <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
  </RAAppBar>
)
