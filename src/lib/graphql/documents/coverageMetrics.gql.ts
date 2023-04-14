import { gql } from '../../../__generated__'

export const GetPaginatedCoverageMetrics = gql(/* GraphQL */ `
  query GetPaginatedCoverageMetrics($page: Int!, $limit: Int!) {
    paginatedCoverageMetrics(page: $page, limit: $limit) {
      pagination {
        total
      }
      data {
        _id
        name
        sonarKey
        totalCoveragePercent
        linesToCover
        linesNoCoverage
        linesCoveragePercent
        qtyConditionsToCover
        qtyConditionsWithoutCover
        conditionsCoveragePercentage
        createdAt
      }
    }
  }
`)
