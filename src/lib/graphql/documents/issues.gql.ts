import { gql } from '../../../__generated__'

export const GetPaginatedIssues = gql(/* GraphQL */ `
  query GetPaginatedIssues($page: Int!, $filter: IssuesFilter, $limit: Int) {
    paginatedIssues(page: $page, filter: $filter, limit: $limit) {
      pagination {
        total
      }
      data {
        _id
        sonarKey
        project
        status
        developerEmail
        file
        issueCreatedAt
        issueUpdatedAt
        language
        observation
        project
        rule
        scope
        severity
        issueCreatedAt
        startLine
      }
    }
  }
`)
