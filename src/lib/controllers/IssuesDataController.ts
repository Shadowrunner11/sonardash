import { batchProccess } from '../../utils'
import { elasticSearchLimit } from '../../config/globals'
import type { IFetchClient } from '../../types'
import type { PaginationParams, SonarApiParams } from '../../types/sonarQube'
import type { IIssuesResponse } from '../../types/sonarQube/issue'

export class IssuesDataController {
  private fetchClient: IFetchClient
  constructor(fetchClient: IFetchClient) {
    this.fetchClient = fetchClient
  }

  protected fetchIssuesSearch(params: SonarApiParams) {
    return this.fetchClient.get<IIssuesResponse, SonarApiParams>('/issues/search', params)
  }

  async getIssuesByProject(projectKey: string, params: PaginationParams) {
    const { issues, paging, total } = await this.fetchIssuesSearch({
      componentKeys: projectKey,
      ...params,
    })

    return { data: issues, pageInfo: paging, total }
  }

  async getPaginatedIssues({ page = 1, pageSize = 500, filters = { resolved: false } }) {
    const { issues, paging, total } = await this.fetchIssuesSearch({
      p: page,
      ps: pageSize,
      ...filters,
    })

    return { data: issues, pageInfo: paging, total }
  }

  async getAllIssuesLikePagination() {
    const data = await this.getAllIssues()

    // TODO: desacoplar y evitar harcodeo
    return { data, pageInfo: { pageIndex: 1, pageSize: 1000, total: 1000 } }
  }

  async getAllIssues(pageSize = 500, concurrentRequests = 10) {
    const firstIterationResult = await this.getPaginatedIssues({ pageSize })
    const {
      pageInfo: { total },
      data,
    } = firstIterationResult

    const maxItemsCount = Math.min(elasticSearchLimit, total)
    const maxIterations = Math.round(maxItemsCount / pageSize) - 1

    const emptyPaginationByIndexHelperArray = Array.from(Array(maxIterations))

    const result = await batchProccess(
      emptyPaginationByIndexHelperArray,
      (_, index, batchIteration) => {
        const page = index + concurrentRequests * batchIteration + 2

        return this.getPaginatedIssues({ page })
      },
      concurrentRequests
    )

    return result.flatMap(({ data }) => data).concat(data)
  }
}
