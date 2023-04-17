import { memo, useMemo, useRef } from 'react'
import { Box, Button, CircularProgress, Tooltip, Typography } from '@mui/material'
import { MailOutline as MailIcon } from '@mui/icons-material'
import { FilterList, FilterListItem, RaRecord, useInfiniteGetList } from 'react-admin'
import { FacetProperties, FacetValue } from '../../types/sonarQube/issue'
import { AuthorGraphql } from 'src/__generated__/graphql'

export interface AuthorResource extends FacetValue {
  id: string
}

interface FilterWithTooltip {
  email: string
}

const FilterWithToolTip = ({ email }: FilterWithTooltip) => {
  const ref = useRef<HTMLParagraphElement>(null)

  const isWrapped = (ref.current?.clientWidth ?? 0) < (ref.current?.scrollWidth ?? 0)

  return (
    <FilterListItem
      label={
        isWrapped ? (
          <Tooltip title={email}>
            <Typography ref={ref} component='p' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {email}
            </Typography>
          </Tooltip>
        ) : (
          <Typography ref={ref} component='p' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {email}
          </Typography>
        )
      }
      value={{ author: email }}
    />
  )
}

// TODO; search useSingal or memoized for const authors or similar
const Filter = () => {
  const { data, fetchNextPage, isLoading } = useInfiniteGetList<Partial<AuthorGraphql> & RaRecord>(
    FacetProperties.AUTHORS
  )

  const authors = useMemo(() => data?.pages.flatMap(({ data }) => data), [ data?.pages ])

  return (
    <Box>
      <FilterList label='Authors' icon={<MailIcon />}>
        <Box
          sx={{
            overflowY: 'scroll',
          }}
          maxHeight='50vh'>
          {authors?.map(({ id, email }) => email && <FilterWithToolTip key={id} email={email} />)}
        </Box>
      </FilterList>
      {isLoading ? <CircularProgress /> : <Button onClick={() => fetchNextPage()}>Mostrar mas</Button>}
    </Box>
  )
}

export default memo(Filter)
