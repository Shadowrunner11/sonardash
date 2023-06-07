import { forwardRef, memo, useMemo, useRef } from 'react'
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material'
import { MailOutline as MailIcon } from '@mui/icons-material'
import { FilterList, FilterListItem, RaRecord, useInfiniteGetList } from 'react-admin'
import { FacetProperties, FacetValue } from '../../types/sonarQube/issue'
import { AuthorGraphql } from 'src/__generated__/graphql'
import { Virtuoso, ItemContent } from 'react-virtuoso'

export interface AuthorResource extends FacetValue {
  id: string
}

interface FilterWithToolTipProps {
  email: string
}

const FilterWithToolTipRef = forwardRef<HTMLLIElement | null, FilterWithToolTipProps>(
  function FilterWithToolTip({ email }: FilterWithToolTipProps, ref) {
    const textRef = useRef<HTMLParagraphElement>(null)

    const isWrapped = (textRef.current?.clientWidth ?? 0) < (textRef.current?.scrollWidth ?? 0)

    return (
      <FilterListItem
        label={
          isWrapped ? (
            <Tooltip title={email}>
              <Box ref={ref} sx={{ margin: 0 }}>
                <Typography ref={textRef} component='p' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {email}
                </Typography>
              </Box>
            </Tooltip>
          ) : (
            <Box ref={ref} sx={{ margin: 0 }}>
              <Typography ref={textRef} component='p' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {email}
              </Typography>
            </Box>
          )
        }
        value={{ author: email }}
      />
    )
  }
)

const FilterVirtuosoItem: ItemContent<Partial<AuthorGraphql> & RaRecord, unknown> = (_, data) => (
  <FilterWithToolTipRef key={data.id} email={data.email ?? ''} />
)

const Filter = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteGetList<Partial<AuthorGraphql> & RaRecord>(
    FacetProperties.AUTHORS
  )

  const authors = useMemo(
    () => data?.pages.flatMap(({ data }) => data).filter(({ email }) => email) ?? [],
    [ data?.pages ]
  )

  return (
    <Box>
      <FilterList label='Authors' icon={<MailIcon />}>
        <Virtuoso
          data={authors}
          endReached={() => fetchNextPage()}
          itemContent={FilterVirtuosoItem}
          style={{ overflowY: 'scroll', height: '50vh' }}
        />
      </FilterList>
      {isFetchingNextPage && (
        <CircularProgress
          sx={{
            marginX: 'auto',
            marginY: 4,
          }}
        />
      )}
    </Box>
  )
}

export default memo(Filter)
