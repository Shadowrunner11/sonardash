/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query GetPaginatedAuthors($page: Int!,$limit: Float!) {\n    paginatedAuthors(page: $page, limit: $limit) {\n      pagination {\n        total\n      }\n      data {\n        _id\n        email\n      }\n    }\n  }\n':
    types.GetPaginatedAuthorsDocument,
  '\n  query GetPaginatedIssues($page: Int!, $filter: IssuesFilter, $limit: Int) {\n    paginatedIssues(page: $page, filter: $filter, limit: $limit) {\n      pagination {\n        total\n      }\n      data {\n        _id\n        sonarKey\n        project\n        status\n        developerEmail\n        file\n        issueCreatedAt\n        issueUpdatedAt\n        language\n        observation\n        project\n        rule\n        scope\n        severity\n        issueCreatedAt\n        startLine\n      }\n    }\n  }\n':
    types.GetPaginatedIssuesDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPaginatedAuthors($page: Int!,$limit: Float!) {\n    paginatedAuthors(page: $page, limit: $limit) {\n      pagination {\n        total\n      }\n      data {\n        _id\n        email\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetPaginatedAuthors($page: Int!,$limit: Float!) {\n    paginatedAuthors(page: $page, limit: $limit) {\n      pagination {\n        total\n      }\n      data {\n        _id\n        email\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPaginatedIssues($page: Int!, $filter: IssuesFilter, $limit: Int) {\n    paginatedIssues(page: $page, filter: $filter, limit: $limit) {\n      pagination {\n        total\n      }\n      data {\n        _id\n        sonarKey\n        project\n        status\n        developerEmail\n        file\n        issueCreatedAt\n        issueUpdatedAt\n        language\n        observation\n        project\n        rule\n        scope\n        severity\n        issueCreatedAt\n        startLine\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetPaginatedIssues($page: Int!, $filter: IssuesFilter, $limit: Int) {\n    paginatedIssues(page: $page, filter: $filter, limit: $limit) {\n      pagination {\n        total\n      }\n      data {\n        _id\n        sonarKey\n        project\n        status\n        developerEmail\n        file\n        issueCreatedAt\n        issueUpdatedAt\n        language\n        observation\n        project\n        rule\n        scope\n        severity\n        issueCreatedAt\n        startLine\n      }\n    }\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never
