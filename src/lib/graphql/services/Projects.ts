import { ApolloClient } from '@apollo/client'
import type { GetListParams, GetListResult } from 'react-admin'
import { GraphqlService } from 'src/types'
import { GetPaginatedProjects } from '../documents/projects.gql'

export class Projects<T = unknown> implements GraphqlService {
  constructor(private client: ApolloClient<T>) {}
  async getList(params: GetListParams): Promise<GetListResult> {
    const {
      pagination: { page, perPage },
    } = params

    const {
      data: {
        paginatedProjects: {
          data,
          pagination: { total },
        },
      },
    } = await this.client.query({
      query: GetPaginatedProjects,
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
