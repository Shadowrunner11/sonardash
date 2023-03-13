import { IFetchClient } from '../../types'
import { SonarApiParams } from '../../types/sonarQube'
import { FacetProperties, IIssuesResponse } from '../../types/sonarQube/issue'

export class RulesDataController {
  private fetchClient: IFetchClient
  constructor(client: IFetchClient) {
    this.fetchClient = client
  }
  async getRulesByProject(projectKey: string) {
    const { facets } = await this.fetchClient.get<IIssuesResponse, SonarApiParams>('issues/search', {
      facets: FacetProperties.RULES,
      componentKeys: projectKey,
      ps: 1,
    })

    const rulesFacet = facets.find(({ property }) => property === FacetProperties.RULES)

    if (rulesFacet === undefined) throw new Error('No hay reglas')

    return rulesFacet.values
  }
}
