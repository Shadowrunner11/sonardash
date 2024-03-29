import { ApolloClient } from '@apollo/client'
import type {
  GetListParams,
  GetListResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
} from 'react-admin'
import { GraphqlService } from 'src/types'
import { GetPaginatedCoverageMetrics } from '../documents/coverageMetrics.gql'
import { getTimeAndDate } from '../../../utils/date'

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
      const { _id, createdAt, ...rest } = item ?? {}
      const { date, time } = getTimeAndDate(new Date(createdAt))
      const parsedRest = Object.keys(rest).reduce((acum: Record<string, string>, key) => {
        acum[key] = rest[key as keyof typeof rest] ?? '--'
        return acum
      }, {})
      return {
        id: _id,
        ...parsedRest,
        observation: 'cobertura',
        file: 'proyecto',
        date,
        hour: time,
      }
    })

    return {
      data: paserseData,
      total,
    }
  }

  update(params: UpdateParams<any>) {
    return Promise.reject(params)
  }

  updateMany(params: UpdateManyParams<any>): Promise<UpdateManyResult<any>> {
    return Promise.reject(params)
  }
}
