import { Card, CardContent, SxProps } from '@mui/material'
import { memo } from 'react'

interface SideCardProps {
  content: JSX.Element
}

const cardTheme: SxProps = {
  order: -1,
  marginRight: 2,
  marginTop: 8,
  width: 400,
  minWidth: 300,
  pt: 0,
}

const SideCard = ({ content }: SideCardProps) => (
  <Card sx={cardTheme}>
    <CardContent sx={{ pt: 0 }}>{content}</CardContent>
  </Card>
)

export default memo(SideCard)
