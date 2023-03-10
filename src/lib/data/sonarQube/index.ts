import { DataProvider, GetListResult, GetManyResult, GetOneResult } from 'react-admin'
import { NotImplementeError } from '../../errors'

import { TOKEN, API_URL } from '@config/sonarQube'
import { AxiosFetchClient } from 'src/lib/service/AxiosFetchClient'
import { IssuesDataController } from 'src/lib/controllers/IssuesDataController'

// TODO: usar auth provider
// TODO: controlar errores
// TODO: diseniar servicio (Facede, adaptaer y/o proxy)

const client = new AxiosFetchClient({
  baseURL: API_URL,
  auth: {
    password: '',
    username: TOKEN,
  },
})

const issueController = new IssuesDataController(client)

export const dataProvider: DataProvider = {
  async getList(resource, params): Promise<GetListResult> {
    const responseData = issueController.getAllProjects()

    const {
      issues,
      paging: { pageIndex, pageSize },
    } = responseData

    const data = issues.map((issue) => ({
      id: issue.key,
      ...issue,
    }))

    return {
      data,
      total: pageSize,
      pageInfo: {
        hasNextPage: pageIndex !== pageSize,
        hasPreviousPage: pageIndex !== 1,
      },
    }
  },
  async getOne(_, params): Promise<GetOneResult> {
    const issue = await client.getIssue(params.id)

    return { data: { id: issue.key, ...issue } }
  },
  async getMany(_, params): Promise<GetManyResult> {
    const responseData = await client.getIssues({
      issuesKeys: params.ids,
    })

    const data = responseData?.issues.map((issue) => ({
      id: issue.key,
      ...issue,
    }))

    return { data }
  },
  async create() {
    throw new NotImplementeError()
  },
  delete() {
    throw new NotImplementeError()
  },
  deleteMany() {
    throw new NotImplementeError()
  },
  getManyReference() {
    throw new NotImplementeError()
  },
  update() {
    throw new NotImplementeError()
  },
  updateMany() {
    throw new NotImplementeError()
  },
}
