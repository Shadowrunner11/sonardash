/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type Author = {
  __typename?: 'Author'
  _id: Scalars['ID']
  email: Scalars['String']
}

export type FilterItemString = {
  isExclusion?: InputMaybe<Scalars['Boolean']>
  value: Scalars['String']
}

export type FilterItemsString = {
  isExclusion?: InputMaybe<Scalars['Boolean']>
  values: Array<Scalars['String']>
}

export type Issue = {
  __typename?: 'Issue'
  _id: Scalars['ID']
  createdAt: Scalars['DateTime']
  developerEmail?: Maybe<Scalars['String']>
  file: Scalars['String']
  issueCreatedAt: Scalars['DateTime']
  issueUpdatedAt: Scalars['DateTime']
  language: Scalars['String']
  observation: Scalars['String']
  project: Scalars['String']
  rule: Scalars['String']
  scope?: Maybe<Scalars['String']>
  severity: Scalars['String']
  sonarHash?: Maybe<Scalars['String']>
  sonarKey: Scalars['String']
  sonarRuleMessage?: Maybe<Scalars['String']>
  startLine: Scalars['Float']
  status: Scalars['String']
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  updatedAt: Scalars['DateTime']
}

export type IssuesFilter = {
  _ids?: InputMaybe<FilterItemsString>
  createdAtFilter?: InputMaybe<TimeFilter>
  developerEmails?: InputMaybe<FilterItemsString>
  file?: InputMaybe<FilterItemString>
  issueCreatedAt?: InputMaybe<TimeFilter>
  issuedUpdatedAt?: InputMaybe<TimeFilter>
  observations?: InputMaybe<FilterItemsString>
  projects?: InputMaybe<FilterItemsString>
  rules?: InputMaybe<FilterItemsString>
  scope?: InputMaybe<FilterItemString>
  sonarKeys?: InputMaybe<FilterItemsString>
  status?: InputMaybe<FilterItemString>
  updatedAtFilter?: InputMaybe<TimeFilter>
}

export type PaginatedAuthors = {
  __typename?: 'PaginatedAuthors'
  data: Array<Author>
  pagination: PaginationInfo
}

export type PaginatedIssues = {
  __typename?: 'PaginatedIssues'
  data: Array<Maybe<Issue>>
  pagination: PaginationInfo
}

export type PaginationInfo = {
  __typename?: 'PaginationInfo'
  hasNext?: Maybe<Scalars['Boolean']>
  page: Scalars['Int']
  total: Scalars['Int']
}

export type Project = {
  __typename?: 'Project'
  _id: Scalars['ID']
  createdAt: Scalars['DateTime']
  isFavorite?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  needIssueSync?: Maybe<Scalars['Boolean']>
  qualifier: Scalars['String']
  sonarKey: Scalars['String']
  tags: Array<Maybe<Scalars['String']>>
  updatedAt: Scalars['DateTime']
  visibility: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  issue: Issue
  paginatedAuthors: PaginatedAuthors
  paginatedIssues: PaginatedIssues
  project: Project
}

export type QueryIssueArgs = {
  _id: Scalars['ID']
}

export type QueryPaginatedAuthorsArgs = {
  limit?: Scalars['Float']
  page: Scalars['Int']
}

export type QueryPaginatedIssuesArgs = {
  filter?: InputMaybe<IssuesFilter>
  limit?: Scalars['Int']
  page: Scalars['Int']
}

export type QueryProjectArgs = {
  _id: Scalars['ID']
}

export type TimeFilter = {
  afterDate?: InputMaybe<Scalars['DateTime']>
  beforeDate?: InputMaybe<Scalars['DateTime']>
}

export type GetPaginatedAuthorsQueryVariables = Exact<{
  page: Scalars['Int']
  limit: Scalars['Float']
}>

export type GetPaginatedAuthorsQuery = {
  __typename?: 'Query'
  paginatedAuthors: {
    __typename?: 'PaginatedAuthors'
    pagination: { __typename?: 'PaginationInfo'; total: number }
    data: Array<{ __typename?: 'Author'; _id: string; email: string }>
  }
}

export type GetPaginatedIssuesQueryVariables = Exact<{
  page: Scalars['Int']
  filter?: InputMaybe<IssuesFilter>
  limit?: InputMaybe<Scalars['Int']>
}>

export type GetPaginatedIssuesQuery = {
  __typename?: 'Query'
  paginatedIssues: {
    __typename?: 'PaginatedIssues'
    pagination: { __typename?: 'PaginationInfo'; total: number }
    data: Array<{
      __typename?: 'Issue'
      _id: string
      sonarKey: string
      project: string
      status: string
      developerEmail?: string | null
      file: string
      issueCreatedAt: any
      issueUpdatedAt: any
      language: string
      observation: string
      rule: string
      scope?: string | null
      severity: string
      startLine: number
    } | null>
  }
}

export const GetPaginatedAuthorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPaginatedAuthors' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paginatedAuthors' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pagination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPaginatedAuthorsQuery, GetPaginatedAuthorsQueryVariables>
export const GetPaginatedIssuesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPaginatedIssues' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'IssuesFilter' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paginatedIssues' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pagination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sonarKey' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'project' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'developerEmail' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'file' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'issueCreatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'issueUpdatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'project' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rule' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'scope' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'severity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'issueCreatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startLine' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPaginatedIssuesQuery, GetPaginatedIssuesQueryVariables>
