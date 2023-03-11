import { IFetchClient } from '../../types'
import { PaginationParams, SonarApiParams } from '../../types/sonarQube'
import { IIssuesResponse } from '../../types/sonarQube/issue'

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

  async getPaginatedIssues(page = 1, pageSize = 500) {
    const { issues, paging, total } = await this.fetchIssuesSearch({
      p: page,
      ps: pageSize,
    })

    return { data: issues, pageInfo: paging, total }
  }
}
