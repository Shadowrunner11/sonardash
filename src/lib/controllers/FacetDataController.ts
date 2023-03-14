import { Component, Facet, FacetProperties, FacetValue } from '../../types/sonarQube/issue'
import { IssuesDataController } from './IssuesDataController'
import { IFetchClient } from '../../types'

export class FacetsDataController extends IssuesDataController {
  constructor(fetchClient: IFetchClient) {
    super(fetchClient)
  }

  parseFacets(facetGroup: FacetProperties[] | FacetProperties) {
    return Array.isArray(facetGroup) ? facetGroup.join.call(this) : facetGroup
  }

  getFacetsHelper(facets: Facet[], facetGroup: FacetProperties[] | FacetProperties) {
    return !Array.isArray(facetGroup) ? facets.find(({ property }) => property === facetGroup)?.values : facets
  }

  async getFacetsByProject(projectKey: string, facetGroup: FacetProperties[] | FacetProperties) {
    const { facets } = await this.fetchIssuesSearch({
      facets: this.parseFacets(facetGroup),
      componentKeys: projectKey,
      ps: 1,
    })

    const authorsFacet = this.getFacetsHelper(facets, facetGroup)

    if (!authorsFacet) throw new Error('No hay autores')

    return authorsFacet
  }
}
