import { AppBarProps, AppBar as RAAppBar, ToggleThemeButton, defaultTheme } from 'react-admin'
import { Box, Typography } from '@mui/material'
import { darkTheme } from '@config/theme'
import './appBar.css'

//TODO: create pattern to remove cache of axios when hitting refresh
export const AppBar = (props: AppBarProps) => {
  return (
    <RAAppBar {...props}>
      <Box flex='1'>
        <Typography variant='h6' id='react-admin-title'></Typography>
      </Box>
      <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
      {/* <RefreshButton /> */}
    </RAAppBar>
  )
}
