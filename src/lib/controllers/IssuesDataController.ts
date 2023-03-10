import { IFetchClient } from '../../types'
import { SonarApiParams } from '../../types/sonarQube'
import { FacetProperties, IIssuesResponse } from '../../types/sonarQube/issue'

interface GetPaginationArgs {
  page?: number
  pageSize: number
}

export class IssuesDataController {
  fetchClient: IFetchClient

  constructor(fetchClient: IFetchClient) {
    this.fetchClient = fetchClient
  }

  getPaginatedProjects({ page = 1, pageSize }: GetPaginationArgs) {
    return this.fetchClient.get<IIssuesResponse, SonarApiParams>('/components/search_projects', {
      p: page,
      ps: pageSize,
    })
  }

  async getAllProjects(pageSize = 500) {
    const firstIterationResult = await this.getPaginatedProjects({ pageSize })
    const {
      paging: { total },
      components,
    } = firstIterationResult
    const maxIterations = Math.round(total / pageSize) - 1

    const listArray = Array.from(Array(maxIterations))

    const restResultsByPage = await Promise.all(
      listArray.map((_, index) => this.getPaginatedProjects({ page: index + 2, pageSize }))
    )

    return restResultsByPage.flatMap(({ components }) => components).concat(components)
  }

  async getAuthorsByProject(projectKey: string) {
    const { facets } = await this.fetchClient.get<IIssuesResponse, SonarApiParams>('/issues/search', {
      facets: FacetProperties.AUTHORS,
      componentKeys: projectKey,
      ps: 1,
    })

    const authorsFacet = facets.find(({ property }) => property === FacetProperties.AUTHORS)

    if (authorsFacet === undefined) throw new Error('No hay autores')

    return authorsFacet.values
  }
}
