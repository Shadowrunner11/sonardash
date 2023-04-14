import { ApolloClient } from '@apollo/client'
import type { GetListParams, GetListResult } from 'react-admin'
import { GraphqlService } from 'src/types'
import { GetPaginatedCoverageMetrics } from '../documents/coverageMetrics.gql'

export class CoverageMetrics<T = unknown> implements GraphqlService {
  constructor(private client: ApolloClient<T>) {}
  async getList(params: GetListParams): Promise<GetListResult> {
    const {
      pagination: { page, perPage },
    } = params

    const {
      data: {
        paginatedCoverageMetrics: {
          data,
          pagination: { total },
        },
      },
    } = await this.client.query({
      query: GetPaginatedCoverageMetrics,
      variables: {
        page,
        limit: perPage,
      },
    })

    const paserseData = data.map((item) => {
      const { _id, ...rest } = item ?? {}
      const parsedRest = Object.keys(rest).reduce((acum: Record<string, string>, key) => {
        acum[key] = rest[key as keyof typeof rest] ?? '--'
        return acum
      }, {})
      return {
        id: _id,
        ...parsedRest,
        observation: 'cobertura',
        file: 'proyecto',
      }
    })

    return {
      data: paserseData,
      total,
    }
  }
}
