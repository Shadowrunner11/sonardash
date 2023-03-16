import { Box, Skeleton } from '@mui/material'
import { memo } from 'react'

interface ResponsiveLoadingProps {
  mobileview: JSX.Element
  desktopview: JSX.Element
}

const ResponsiveLoadingScreen = ({ mobileview, desktopview }: ResponsiveLoadingProps) => (
  <Box padding={4} height='100vh'>
    <Box flex='1' display='flex' justifyContent='space-between' alignItems='center' marginBottom={4}>
      <Skeleton variant='rectangular' width={120} height={12} />
      <Skeleton variant='circular' width={40} height={40} />
    </Box>
    {mobileview}
    {desktopview}
  </Box>
)

export default memo(ResponsiveLoadingScreen)
