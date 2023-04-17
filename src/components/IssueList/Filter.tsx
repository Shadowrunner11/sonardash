import { forwardRef, memo, useMemo, useRef } from 'react'
import { Box, Button, CircularProgress, Tooltip, Typography } from '@mui/material'
import { MailOutline as MailIcon } from '@mui/icons-material'
import { FilterList, FilterListItem, RaRecord, useInfiniteGetList } from 'react-admin'
import { FacetProperties, FacetValue } from '../../types/sonarQube/issue'
import { Author } from 'src/__generated__/graphql'
import useInfiniteScroll from 'react-infinite-scroll-hook'

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
              <Typography ref={textRef} component='p' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {email}
              </Typography>
            </Tooltip>
          ) : (
            <Typography ref={textRef} component='p' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {email}
            </Typography>
          )
        }
        value={{ author: email }}
        ref={ref}
      />
    )
  }
)

const Filter = () => {
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteGetList<Partial<Author> & RaRecord>(
    FacetProperties.AUTHORS
  )

  const authors = useMemo(() => data?.pages.flatMap(({ data }) => data), [ data?.pages ])

  const [ lastItemRef ] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage ?? false,
    onLoadMore() {
      fetchNextPage()
    },
    rootMargin: '0px 0px 400px 0px',
  })

  return (
    <Box>
      <FilterList label='Authors' icon={<MailIcon />}>
        <Box sx={{ overflowY: 'scroll' }} maxHeight={'50vh'}>
          {authors?.map(
            ({ id, email }, index, array) => email && <FilterWithToolTipRef key={id} email={email} />
          )}
        </Box>
      </FilterList>
      {isLoading && <CircularProgress />}
    </Box>
  )
}

export default memo(Filter)
