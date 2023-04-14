import { gql } from '../../../__generated__'

export const GetPaginatedDuplicatedMetrics = gql(/* GraphQL */ `
  query GetPaginatedDuplicatedMetrics($page: Int!, $limit: Int!) {
    paginatedDuplicatedMetrics(page: $page, limit: $limit) {
      pagination {
        total
      }
      data {
        totalDensityPercent
        duplicatedLines
        duplicatedBlocks
        duplicatedFiles
        _id
        name
        sonarKey
        createdAt
        updatedAt
      }
    }
  }
`)
