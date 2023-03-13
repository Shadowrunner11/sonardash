import { Card, CardContent, Button, CircularProgress } from '@mui/material'
import { MailOutline as MailIcon } from '@mui/icons-material'
import { FilterList, FilterListItem } from 'react-admin'
import { FacetProperties, FacetValue } from '../../types/sonarQube/issue'
import { useCustomInfnite } from './hooks'

export interface AuthorResource extends FacetValue {
  id: string
}

export function Filter() {
  const { data: authors, fetchNext, isLoading } = useCustomInfnite({ resource: FacetProperties.AUTHORS })

  return (
    <Card sx={{ order: -1, mr: 2, mt: 8, width: 400, minWidth: 300, pt: 0 }}>
      <CardContent sx={{ pt: 0 }}>
        <FilterList label='Authors' icon={<MailIcon />}>
          {authors.map(({ val }, index) => (
            <FilterListItem key={val + index} label={val} value={{ authors: val }} />
          ))}
        </FilterList>
        {isLoading ? <CircularProgress /> : <Button onClick={() => fetchNext()}>Mostrar mas</Button>}
      </CardContent>
    </Card>
  )
}
