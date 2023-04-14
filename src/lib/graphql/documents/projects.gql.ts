import { gql } from '../../../__generated__'

export const GetPaginatedProjects = gql(/* GraphQL */ `
  query GetPaginatedProjects($page: Int!, $limit: Int) {
    paginatedProjects(page: $page, limit: $limit) {
      pagination {
        total
      }
      data {
        sonarKey
        name
        qualifier
        isFavorite
        visibility
        needIssueSync
        _id
        createdAt
        updatedAt
      }
    }
  }
`)
