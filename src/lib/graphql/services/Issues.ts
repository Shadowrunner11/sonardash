import { ApolloClient } from '@apollo/client'
import type { GetListParams, GetListResult } from 'react-admin'
import { GraphqlService } from 'src/types'
import { GetPaginatedIssues } from '../documents/issues.gql'
import { cleanPojo } from '../../../utils'
import { InputMaybe, IssuesFilter } from 'src/__generated__/graphql'

export class Issues<T = unknown> implements GraphqlService {
  constructor(private client: ApolloClient<T>) {}
  async getList(params: GetListParams): Promise<GetListResult> {
    const {
      pagination: { page, perPage },
      filter,
    } = params

    // TODO: implement filtering parsing and clean POJO to avoid passing nullish values
    // TODO: check backed protecion to nullish filters
    // TODO: type filter
    const parsedFilter: InputMaybe<IssuesFilter> = cleanPojo({
      ...(filter.author
        ? {
          developerEmails: {
            values: [ filter.author ],
          },
        }
        : {}),
    })

    const isThereFilters = Object.keys(parsedFilter).length

    const {
      data: {
        paginatedIssues: {
          data,
          pagination: { total },
        },
      },
    } = await this.client.query({
      query: GetPaginatedIssues,
      variables: {
        page,
        limit: perPage,
        ...(isThereFilters ? { filter: parsedFilter } : {}),
      },
    })

    const paserseData = data.map((item) => {
      const { _id, ...rest } = item ?? {}

      return {
        id: _id,
        ...rest,
      }
    })

    return {
      data: paserseData,
      total,
    }
  }
}
