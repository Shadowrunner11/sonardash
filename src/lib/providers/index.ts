import { ApolloClient } from '@apollo/client'
import { FacetProperties } from '../../types/sonarQube/issue'
import { FetchSonarClientFactory } from '../../lib/service/FetchClient/FetchClient.factory'

import { IssuesDataController, ProjectDataController, FacetsDataController } from '../../lib/controllers'

import {
  SonarQubeDataProvider,
  IssuesDataProvider,
  ProjectsDataProvider,
  FacetDataProvider,
} from '../data/sonarQube'

import { AuthSonarProvider } from '../auth/sonarQube/AuthProvider.sonar'
import { apolloClientConfig } from '@config/apollo'
import { GraphQlDataProvider } from '../data/grapqhl/DataProvider'
import { Issues } from '../graphql/services/Issues'
import { Authors } from '../graphql/services/Authors'
import { Projects } from '../graphql/services/Projects'
import { CoverageMetrics } from '../graphql/services/CoverageMetrics'
import { DuplicatedMetrics } from '../graphql/services/DuplicatedMetrics'
import { DataProvider, UpdateParams } from 'react-admin'

// TODO: controlar errores
export const client = FetchSonarClientFactory.getFetchClient()

const facetsProvider = new FacetDataProvider(new FacetsDataController(client))

// TODO: what if facets are not here and in main provider
// prettier-ignore
const createFacetProviders = (facetsProvider: FacetDataProvider) =>
  Object
    .values(FacetProperties)
    .reduce(
      (prevPojo: Record<string, FacetDataProvider>, facetProperty: FacetProperties) => {
        prevPojo[facetProperty] = facetsProvider

        return prevPojo
      },
      {}
    )

export const authProvider = new AuthSonarProvider(client)

// TODO: pasar a enums los resources
export const legacyDataProvider = new SonarQubeDataProvider({
  projects: new ProjectsDataProvider(new ProjectDataController(client)),
  issues: new IssuesDataProvider(new IssuesDataController(client)),
  ...createFacetProviders(facetsProvider),
})

export const apolloClient = new ApolloClient(apolloClientConfig)

export const dataProvider: DataProvider = new (class extends GraphQlDataProvider {
  override async update(resource: string, params: UpdateParams): Promise<any> {
    if (resource === 'bulkauthors') {
      return params.data
    }

    return super.update(resource, params)
  }
})({
  issues: new Issues(apolloClient),
  authors: new Authors(apolloClient),
  projects: new Projects(apolloClient),
  coverageMetrics: new CoverageMetrics(apolloClient),
  duplicatedMetrics: new DuplicatedMetrics(apolloClient),
})
