import { memo, useMemo } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { MailOutline as MailIcon } from '@mui/icons-material'
import { FilterList, FilterListItem, RaRecord, useInfiniteGetList } from 'react-admin'
import { FacetProperties, FacetValue } from '../../types/sonarQube/issue'
import { AuthorGraphql } from 'src/__generated__/graphql'

export interface AuthorResource extends FacetValue {
  id: string
}

const Filter = () => {
  const { data, fetchNextPage, isLoading } = useInfiniteGetList<Partial<AuthorGraphql> & RaRecord>(
    FacetProperties.AUTHORS
  )

  const authors = useMemo(() => data?.pages.flatMap(({ data }) => data), [ data?.pages ])

  return (
    <Box>
      <FilterList label='Authors' icon={<MailIcon />}>
        {authors?.map(
          ({ id, email }) => email && <FilterListItem key={id} label={email} value={{ author: email }} />
        )}
      </FilterList>
      {isLoading ? <CircularProgress /> : <Button onClick={() => fetchNextPage()}>Mostrar mas</Button>}
    </Box>
  )
}

export default memo(Filter)
