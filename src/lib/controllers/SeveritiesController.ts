import { IFetchClient } from '../../types'
import { SonarApiParams } from '../../types/sonarQube'
import { IIssuesResponse, FacetProperties } from '../../types/sonarQube/issue'

export class SeveritiesDataController {
  private fetchClient: IFetchClient
  constructor(client: IFetchClient) {
    this.fetchClient = client
  }
  async getSeveritiesByProject(projectKey: string) {
    const { facets } = await this.fetchClient.get<IIssuesResponse, SonarApiParams>('issues/search', {
      facets: FacetProperties.SEVERITIES,
      componentKeys: projectKey,
      ps: 1,
    })

    const typesFacet = facets.find(({ property }) => property === FacetProperties.SEVERITIES)

    if (typesFacet === undefined) throw new Error('No hay severidades')

    return typesFacet.values
  }
}
