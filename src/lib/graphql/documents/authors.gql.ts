import { gql } from '../../../__generated__'

export const GetPaginatedAuthors = gql(/* GraphQL */ `
  query GetPaginatedAuthors($page: Int!, $limit: Float!, $filter: AuthorsFilters) {
    paginatedAuthors(page: $page, limit: $limit, filter: $filter) {
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

export const UpsertAuthors = gql(/* GraphQL */ `
  mutation UpserAuthors($input: AuthorsInput!) {
    upsertAuthor(input: $input) {
      success
    }
  }
`)
