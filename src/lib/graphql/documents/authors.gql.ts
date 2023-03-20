import { gql } from '../../../__generated__'

export const GetPaginatedAuthors = gql(/* GraphQL */ `
  query GetPaginatedAuthors($page: Int!, $limit: Float!) {
    paginatedAuthors(page: $page, limit: $limit) {
      pagination {
        total
      }
      data {
        _id
        email
      }
    }
  }
`)
