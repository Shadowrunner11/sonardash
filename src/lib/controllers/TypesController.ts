import { IFetchClient } from '../../types'
import { SonarApiParams } from '../../types/sonarQube'
import { IIssuesResponse, FacetProperties } from '../../types/sonarQube/issue'

export class TypesDataController {
  private fetchClient: IFetchClient
  constructor(client: IFetchClient) {
    this.fetchClient = client
  }
  async getTypesByProject(projectKey: string) {
    const { facets } = await this.fetchClient.get<IIssuesResponse, SonarApiParams>('issues/search', {
      facets: FacetProperties.TYPES,
      componentKeys: projectKey,
      ps: 1,
    })

    const typesFacet = facets.find(({ property }) => property === FacetProperties.TYPES)

    if (typesFacet === undefined) throw new Error('No hay tipos')

    return typesFacet.values
  }
}
