import { ApolloClient } from '@apollo/client'
import type { GetListParams, GetListResult, UpdateManyParams, UpdateParams } from 'react-admin'
import { GraphqlService } from 'src/types'
import { GetPaginatedAuthors, UpsertAuthors } from '../documents/authors.gql'
import { AuthorInput } from 'src/__generated__/graphql'

export class Authors<T = unknown> implements GraphqlService {
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

  async update(params: UpdateParams<AuthorInput>) {
    return Promise.reject(params)
  }

  async updateMany(params: UpdateManyParams<AuthorInput[]>) {
    await this.client.mutate({
      mutation: UpsertAuthors,
      variables: {
        input: { authors: params.data.filter(Boolean) },
      },
    })

    this.client.cache.evict({ fieldName: 'paginatedAuthors' })

    return {
      data: params.data.map(({ email }) => email),
    }
  }
}
