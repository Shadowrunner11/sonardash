/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthorGraphql = {
  __typename?: 'AuthorGraphql';
  _id: Scalars['ID'];
  chapter?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  squad?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  tribe?: Maybe<Scalars['String']>;
};

export type AuthorInput = {
  chapter?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  squad?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  tribe?: InputMaybe<Scalars['String']>;
};

export type AuthorUpsertRespose = {
  __typename?: 'AuthorUpsertRespose';
  success: Scalars['Boolean'];
};

export type AuthorsFilters = {
  _ids?: InputMaybe<FilterItemsString>;
  createdAtFilter?: InputMaybe<TimeFilter>;
  email?: InputMaybe<FilterItemString>;
  updatedAtFilter?: InputMaybe<TimeFilter>;
};

export type AuthorsInput = {
  authors: Array<AuthorInput>;
};

export type Coverage = {
  __typename?: 'Coverage';
  _id: Scalars['ID'];
  conditionsCoveragePercentage?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  linesCoveragePercent?: Maybe<Scalars['Float']>;
  linesNoCoverage?: Maybe<Scalars['Float']>;
  linesToCover?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  qtyConditionsToCover?: Maybe<Scalars['Float']>;
  qtyConditionsWithoutCover?: Maybe<Scalars['Float']>;
  sonarKey?: Maybe<Scalars['String']>;
  totalCoveragePercent?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type Duplication = {
  __typename?: 'Duplication';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  duplicatedBlocks: Scalars['Float'];
  duplicatedFiles: Scalars['Float'];
  duplicatedLines: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  sonarKey?: Maybe<Scalars['String']>;
  totalDensityPercent: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type FilterItemString = {
  isExclusion?: InputMaybe<Scalars['Boolean']>;
  isPartialMatch?: Scalars['Boolean'];
  value: Scalars['String'];
};

export type FilterItemsString = {
  isExclusion?: InputMaybe<Scalars['Boolean']>;
  values: Array<Scalars['String']>;
};

export type Issue = {
  __typename?: 'Issue';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  developerEmail?: Maybe<Scalars['String']>;
  file: Scalars['String'];
  issueCreatedAt: Scalars['DateTime'];
  issueUpdatedAt: Scalars['DateTime'];
  language: Scalars['String'];
  observation: Scalars['String'];
  project: Scalars['String'];
  rule: Scalars['String'];
  scope?: Maybe<Scalars['String']>;
  severity: Scalars['String'];
  sonarHash?: Maybe<Scalars['String']>;
  sonarKey: Scalars['String'];
  sonarRuleMessage?: Maybe<Scalars['String']>;
  startLine: Scalars['Float'];
  status: Scalars['String'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt: Scalars['DateTime'];
};

export type IssuesFilter = {
  _ids?: InputMaybe<FilterItemsString>;
  createdAtFilter?: InputMaybe<TimeFilter>;
  developerEmails?: InputMaybe<FilterItemsString>;
  file?: InputMaybe<FilterItemString>;
  issueCreatedAt?: InputMaybe<TimeFilter>;
  issuedUpdatedAt?: InputMaybe<TimeFilter>;
  observations?: InputMaybe<FilterItemsString>;
  projects?: InputMaybe<FilterItemsString>;
  rules?: InputMaybe<FilterItemsString>;
  scope?: InputMaybe<FilterItemString>;
  sonarKeys?: InputMaybe<FilterItemsString>;
  status?: InputMaybe<FilterItemString>;
  updatedAtFilter?: InputMaybe<TimeFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertAuthor: AuthorUpsertRespose;
};


export type MutationUpsertAuthorArgs = {
  input: AuthorsInput;
};

export type PaginatedAuthors = {
  __typename?: 'PaginatedAuthors';
  data: Array<AuthorGraphql>;
  pagination: PaginationInfo;
};

export type PaginatedCoverageMetrics = {
  __typename?: 'PaginatedCoverageMetrics';
  data: Array<Maybe<Coverage>>;
  pagination: PaginationInfo;
};

export type PaginatedDuplicatedMetrics = {
  __typename?: 'PaginatedDuplicatedMetrics';
  data: Array<Maybe<Duplication>>;
  pagination: PaginationInfo;
};

export type PaginatedIssues = {
  __typename?: 'PaginatedIssues';
  data: Array<Maybe<Issue>>;
  pagination: PaginationInfo;
};

export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  data: Array<Maybe<Project>>;
  pagination: PaginationInfo;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  hasNext?: Maybe<Scalars['Boolean']>;
  page: Scalars['Int'];
  total: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID'];
  appName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  isFavorite?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  needIssueSync?: Maybe<Scalars['Boolean']>;
  qualifier: Scalars['String'];
  qualiteGate: Scalars['String'];
  qualiteProfile: Scalars['String'];
  relatedProjects?: Maybe<Array<Maybe<Scalars['String']>>>;
  sonarKey: Scalars['String'];
  squad: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  tribe: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  visibility: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  issue: Issue;
  paginatedAuthors: PaginatedAuthors;
  paginatedCoverageMetrics: PaginatedCoverageMetrics;
  paginatedDuplicatedMetrics: PaginatedDuplicatedMetrics;
  paginatedIssues: PaginatedIssues;
  paginatedProjects: PaginatedProjects;
  project: Project;
};


export type QueryIssueArgs = {
  _id: Scalars['ID'];
};


export type QueryPaginatedAuthorsArgs = {
  filter?: InputMaybe<AuthorsFilters>;
  limit?: Scalars['Float'];
  page: Scalars['Int'];
};


export type QueryPaginatedCoverageMetricsArgs = {
  limit?: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryPaginatedDuplicatedMetricsArgs = {
  limit?: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryPaginatedIssuesArgs = {
  filter?: InputMaybe<IssuesFilter>;
  limit?: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryPaginatedProjectsArgs = {
  limit?: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryProjectArgs = {
  _id: Scalars['ID'];
};

export type TimeFilter = {
  afterDate?: InputMaybe<Scalars['DateTime']>;
  beforeDate?: InputMaybe<Scalars['DateTime']>;
};

export type GetPaginatedAuthorsQueryVariables = Exact<{
  page: Scalars['Int'];
  limit: Scalars['Float'];
  filter?: InputMaybe<AuthorsFilters>;
}>;


export type GetPaginatedAuthorsQuery = { __typename?: 'Query', paginatedAuthors: { __typename?: 'PaginatedAuthors', pagination: { __typename?: 'PaginationInfo', total: number }, data: Array<{ __typename?: 'AuthorGraphql', _id: string, email: string }> } };

export type UpserAuthorsMutationVariables = Exact<{
  input: AuthorsInput;
}>;


export type UpserAuthorsMutation = { __typename?: 'Mutation', upsertAuthor: { __typename?: 'AuthorUpsertRespose', success: boolean } };

export type GetPaginatedCoverageMetricsQueryVariables = Exact<{
  page: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetPaginatedCoverageMetricsQuery = { __typename?: 'Query', paginatedCoverageMetrics: { __typename?: 'PaginatedCoverageMetrics', pagination: { __typename?: 'PaginationInfo', total: number }, data: Array<{ __typename?: 'Coverage', _id: string, name?: string | null, sonarKey?: string | null, totalCoveragePercent?: number | null, linesToCover?: number | null, linesNoCoverage?: number | null, linesCoveragePercent?: number | null, qtyConditionsToCover?: number | null, qtyConditionsWithoutCover?: number | null, conditionsCoveragePercentage?: number | null, createdAt: any } | null> } };

export type GetPaginatedDuplicatedMetricsQueryVariables = Exact<{
  page: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetPaginatedDuplicatedMetricsQuery = { __typename?: 'Query', paginatedDuplicatedMetrics: { __typename?: 'PaginatedDuplicatedMetrics', pagination: { __typename?: 'PaginationInfo', total: number }, data: Array<{ __typename?: 'Duplication', totalDensityPercent: number, duplicatedLines: number, duplicatedBlocks: number, duplicatedFiles: number, _id: string, name?: string | null, sonarKey?: string | null, createdAt: any, updatedAt: any } | null> } };

export type GetPaginatedIssuesQueryVariables = Exact<{
  page: Scalars['Int'];
  filter?: InputMaybe<IssuesFilter>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetPaginatedIssuesQuery = { __typename?: 'Query', paginatedIssues: { __typename?: 'PaginatedIssues', pagination: { __typename?: 'PaginationInfo', total: number }, data: Array<{ __typename?: 'Issue', _id: string, sonarKey: string, project: string, status: string, developerEmail?: string | null, file: string, issueCreatedAt: any, issueUpdatedAt: any, language: string, observation: string, rule: string, scope?: string | null, severity: string, startLine: number } | null> } };

export type GetPaginatedProjectsQueryVariables = Exact<{
  page: Scalars['Int'];
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetPaginatedProjectsQuery = { __typename?: 'Query', paginatedProjects: { __typename?: 'PaginatedProjects', pagination: { __typename?: 'PaginationInfo', total: number }, data: Array<{ __typename?: 'Project', sonarKey: string, name: string, qualifier: string, isFavorite?: boolean | null, visibility: string, needIssueSync?: boolean | null, _id: string, createdAt: any, updatedAt: any } | null> } };


export const GetPaginatedAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedAuthors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedAuthors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetPaginatedAuthorsQuery, GetPaginatedAuthorsQueryVariables>;
export const UpserAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpserAuthors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UpserAuthorsMutation, UpserAuthorsMutationVariables>;
export const GetPaginatedCoverageMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedCoverageMetrics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedCoverageMetrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sonarKey"}},{"kind":"Field","name":{"kind":"Name","value":"totalCoveragePercent"}},{"kind":"Field","name":{"kind":"Name","value":"linesToCover"}},{"kind":"Field","name":{"kind":"Name","value":"linesNoCoverage"}},{"kind":"Field","name":{"kind":"Name","value":"linesCoveragePercent"}},{"kind":"Field","name":{"kind":"Name","value":"qtyConditionsToCover"}},{"kind":"Field","name":{"kind":"Name","value":"qtyConditionsWithoutCover"}},{"kind":"Field","name":{"kind":"Name","value":"conditionsCoveragePercentage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetPaginatedCoverageMetricsQuery, GetPaginatedCoverageMetricsQueryVariables>;
export const GetPaginatedDuplicatedMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedDuplicatedMetrics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedDuplicatedMetrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalDensityPercent"}},{"kind":"Field","name":{"kind":"Name","value":"duplicatedLines"}},{"kind":"Field","name":{"kind":"Name","value":"duplicatedBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"duplicatedFiles"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sonarKey"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetPaginatedDuplicatedMetricsQuery, GetPaginatedDuplicatedMetricsQueryVariables>;
export const GetPaginatedIssuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedIssues"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IssuesFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedIssues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"sonarKey"}},{"kind":"Field","name":{"kind":"Name","value":"project"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"developerEmail"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"issueCreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"issueUpdatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"observation"}},{"kind":"Field","name":{"kind":"Name","value":"project"}},{"kind":"Field","name":{"kind":"Name","value":"rule"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"issueCreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"startLine"}}]}}]}}]}}]} as unknown as DocumentNode<GetPaginatedIssuesQuery, GetPaginatedIssuesQueryVariables>;
export const GetPaginatedProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sonarKey"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"qualifier"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"needIssueSync"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetPaginatedProjectsQuery, GetPaginatedProjectsQueryVariables>;