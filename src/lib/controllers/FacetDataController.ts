import type { Facet, FacetProperties } from '../../types/sonarQube/issue'
import type { IFetchClient } from '../../types'
import { IssuesDataController } from './IssuesDataController'

export class FacetsDataController extends IssuesDataController {
  constructor(fetchClient: IFetchClient) {
    super(fetchClient)
  }

  parseFacets(facetGroup: FacetProperties[] | FacetProperties) {
    return Array.isArray(facetGroup) ? facetGroup.join.call(this) : facetGroup
  }

  getFacetsHelper(facets: Facet[], facetGroup: FacetProperties[] | FacetProperties) {
    return !Array.isArray(facetGroup) ? facets.find(({ property }) => property === facetGroup) : facets
  }

  getFacetsByProject(projectKey: string, facet: FacetProperties): Promise<Facet>

  getFacetsByProject(projectKey: string, facet: FacetProperties[]): Promise<Facet[]>

  async getFacetsByProject(projectKey: string, facetGroup: FacetProperties[] | FacetProperties) {
    const { facets } = await this.fetchIssuesSearch({
      facets: this.parseFacets(facetGroup),
      componentKeys: projectKey,
      ps: 1,
    })

    const authorsFacet = this.getFacetsHelper(facets, facetGroup)

    if (!authorsFacet) throw new Error('No facet data or incorrect facet')

    return authorsFacet
  }
}
