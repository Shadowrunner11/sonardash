import { API_URL } from '@config/sonarQube'
import { DataSource } from './DataSource'
import { IAuth } from 'src/types'
import { IIssuesResponse } from 'src/types/sonarQube/issue'

interface GetIssuesArgs {
  pagination?: number
  issuesKeys?: (string | number)[]
}

export class SonarDataSource extends DataSource {
  private readonly issuesURL = '/issues/search'
  constructor(auth: IAuth) {
    super(API_URL, auth)
  }

  getIssues({ pagination = 1, issuesKeys }: GetIssuesArgs) {
    return this.get<IIssuesResponse>(this.issuesURL, {
      p: pagination,
      issues: issuesKeys?.join(','),
    })
  }

  async getIssue(issueKey: string) {
    const data = await this.getIssues({
      issuesKeys: [ issueKey ],
    })

    const [ issue ] = data.issues

    return issue
  }
}
