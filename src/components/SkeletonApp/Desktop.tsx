import { Skeleton, Box } from '@mui/material'

export const Desktop = () => (
  <Box
    display={{ xs: 'none', sm: 'flex' }}
    justifyContent='space-between'
    height='100%'
    width='100%'
    gap={8}
    alignItems='baseline'>
    <Skeleton variant='rectangular' width='20%' height='100%' />
    <Skeleton variant='rectangular' width='30%' height='90%' />
    <Skeleton variant='rectangular' width='50%' height='90%' />
  </Box>
)
