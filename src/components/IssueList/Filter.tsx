import { forwardRef, memo, useMemo, useRef } from 'react'
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material'
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
              <Box ref={ref}>
                <Typography ref={textRef} component='p' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {email}
                </Typography>
              </Box>
            </Tooltip>
          ) : (
            <Box ref={ref}>
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

const Filter = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteGetList<
    Partial<Author> & RaRecord
  >(FacetProperties.AUTHORS)

  const authors = useMemo(() => data?.pages.flatMap(({ data }) => data), [ data?.pages ])

  const [ lastItemRef ] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: true,
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
            ({ id, email }, index, array) =>
              email && (
                <FilterWithToolTipRef
                  key={id}
                  email={email}
                  {...(index + 1 === array.length ? { ref: lastItemRef } : {})}
                />
              )
          )}
        </Box>
      </FilterList>
      {isFetchingNextPage && <CircularProgress />}
    </Box>
  )
}

export default memo(Filter)
