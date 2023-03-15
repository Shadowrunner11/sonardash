import { Grid } from '@mui/material'
interface ResponsiveProps {
  left: JSX.Element
  right: JSX.Element
}

export const Responsive = ({ left, right }: ResponsiveProps) => {
  return (
    <Grid container alignItems={'center'} minHeight={'100vh'}>
      <Grid item xs={12} md={6} padding={4}>
        {left}
      </Grid>
      <Grid item xs={0} md={6} display={{ xs: 'none', md: 'block' }}>
        {right}
      </Grid>
    </Grid>
  )
}
