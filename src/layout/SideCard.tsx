import { Card, CardContent } from '@mui/material'
import { memo } from 'react'

interface SideCardProps {
  content: JSX.Element
}

const SideCard = ({ content }: SideCardProps) => (
  <Card sx={{ order: -1, mr: 2, mt: 8, width: 400, minWidth: 300, pt: 0 }}>
    <CardContent sx={{ pt: 0 }}>{content}</CardContent>
  </Card>
)

export default memo(SideCard)
