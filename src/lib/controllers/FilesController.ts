import { IFetchClient } from '../../types'
import { SonarApiParams } from '../../types/sonarQube'
import { IIssuesResponse, FacetProperties } from '../../types/sonarQube/issue'

export class FilesDataController {
  private fetchClient: IFetchClient
  constructor(client: IFetchClient) {
    this.fetchClient = client
  }
  async getFilesByProject(projectKey: string) {
    const { facets } = await this.fetchClient.get<IIssuesResponse, SonarApiParams>('issues/search', {
      facets: FacetProperties.FILES,
      componentKeys: projectKey,
      ps: 1,
    })

    const filesFacet = facets.find(({ property }) => property === FacetProperties.FILES)

    if (filesFacet === undefined) throw new Error('No hay archivos')

    return filesFacet.values
  }
}
