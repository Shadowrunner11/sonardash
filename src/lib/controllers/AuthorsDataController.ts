import { Component, FacetProperties, FacetValue } from '../../types/sonarQube/issue'
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

    if (!authorsFacet) throw new Error('No hay autores')

    return authorsFacet.values
  }

  // TODO: evaluate if generators could be a suitable solution
  getPaginatedAuthors(projects: Component[]) {
    const cacheAuthors: FacetValue[] = []

    let stepper = 0

    return async (page: number, pageSize: number) => {
      const limit = page * pageSize

      while (cacheAuthors.length <= limit) {
        const { key } = projects[stepper]

        const authors = await this.getAuthorsByProject(key)

        cacheAuthors.push(...authors)
        stepper++
      }

      return cacheAuthors
    }
  }
}
