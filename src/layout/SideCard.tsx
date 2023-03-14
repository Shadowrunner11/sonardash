import { darkTheme } from '@config/theme'
import { Card, CardContent } from '@mui/material'
import { memo } from 'react'

interface SideCardProps {
  content: JSX.Element
}

//TODO: este theme validation es incorrecto, nose xq se rompe en modo oscuro el custom card, creo q es x un tema q no estoy colocando el default theme

const SideCard = ({ content }: SideCardProps) => (
  <Card
    sx={(theme) => ({
      order: -1,
      marginRight: theme.palette.background.paper !== darkTheme.palette.background.paper ? 2 : 12,
      marginTop: theme.palette.background.paper !== darkTheme.palette.background.paper ? 8 : 64,
      width: 400,
      minWidth: 300,
      pt: 0,
    })}>
    <CardContent sx={{ pt: 0 }}>{content}</CardContent>
  </Card>
)

export default memo(SideCard)
