import { Box, Button, CircularProgress } from '@mui/material'
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
    <Box>
      <FilterList label='Authors' icon={<MailIcon />}>
        {authors.map(({ val }, index) => (
          <FilterListItem key={val + index} label={val} value={{ authors: val }} />
        ))}
      </FilterList>
      {isLoading ? <CircularProgress /> : <Button onClick={() => fetchNext()}>Mostrar mas</Button>}
    </Box>
  )
}
