import { Skeleton, Box } from '@mui/material'

export const Mobile = () => (
  <Box display={{ xs: 'flex', sm: 'none' }} gap={8} flexDirection='column' height='100%'>
    <Skeleton variant='rectangular' width='100%' height='20%' />
    <Skeleton variant='rectangular' width='100%' height='70%' />
  </Box>
)
