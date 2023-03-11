import { FacetProperties } from '../../types/sonarQube/issue'
import { IssuesDataController } from './IssuesDataController'
import { IFetchClient } from '../../types'

export class AuthorsDataController extends IssuesDataController {
  constructor(fetchClient: IFetchClient) {
    super(fetchClient)
  }

  async getAuthorsByProject(projectKey: string) {
    const { facets } = await this.fetchIssuesSearch({
      facets: FacetProperties.AUTHORS,
      componentKeys: projectKey,
      ps: 1,
    })

    const authorsFacet = facets.find(({ property }) => property === FacetProperties.AUTHORS)

    if (authorsFacet === undefined) throw new Error('No hay autores')

    return authorsFacet.values
  }
}
