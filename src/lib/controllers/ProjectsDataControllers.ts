import { GetPaginationArgs, SonarApiParams } from '../../types/sonarQube'
import { IFetchClient } from '../../types'
import { IProjectsResponse } from '../../types/sonarQube/issue'

export class ProjectDataController {
  private fetchClient: IFetchClient

  constructor(fetchClient: IFetchClient) {
    this.fetchClient = fetchClient
  }

  getPaginatedProjects({ page = 1, pageSize }: GetPaginationArgs) {
    return this.fetchClient.get<IProjectsResponse, SonarApiParams>('/components/search_projects', {
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
}
