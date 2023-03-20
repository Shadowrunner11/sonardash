import { ApolloClient } from '@apollo/client'
import type { GetListParams, GetListResult } from 'react-admin'
import { GraphlService } from 'src/types'
import { GetPaginatedAuthors } from '../documents/authors.gql'

export class Authors<T = unknown> implements GraphlService {
  constructor(private client: ApolloClient<T>) {}
  async getList(params: GetListParams): Promise<GetListResult> {
    const {
      pagination: { page, perPage },
    } = params
    const {
      data: {
        paginatedAuthors: {
          data,
          pagination: { total },
        },
      },
    } = await this.client.query({
      query: GetPaginatedAuthors,
      variables: {
        page,
        limit: perPage,
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
