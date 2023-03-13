import { batchProccess } from '../../utils'
import { elasticSearchLimit } from '../../config/globals'
import { IFetchClient } from '../../types'
import { PaginationParams, SonarApiParams } from '../../types/sonarQube'
import { FacetProperties, IIssuesResponse } from '../../types/sonarQube/issue'

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

  async getAllIssues(pageSize = 500) {
    const firstIterationResult = await this.getPaginatedIssues({ pageSize })
    const {
      pageInfo: { total },
      data,
    } = firstIterationResult

    const limitedTotal = Math.min(elasticSearchLimit, total)
    const maxIterations = Math.round(limitedTotal / pageSize) - 1

    const listArray = Array.from(Array(maxIterations))

    const result = await batchProccess(
      listArray,
      (_, index, batchIteration, array) => {
        const page = index + array.length * batchIteration + (!batchIteration ? 0 : 2)

        return this.getPaginatedIssues({ page })
      },
      10
    )

    return result.flatMap(({ data }) => data).concat(data)
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
