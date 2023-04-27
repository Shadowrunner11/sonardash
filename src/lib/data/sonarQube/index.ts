import {
  DataProvider,
  GetListResult,
  GetManyResult,
  GetOneResult,
} from 'react-admin'
import { NotImplementeError } from '../../errors'
import { SonarDataSource } from '../../service/SonarDataSource'
import { SonarAuth } from '../../service/SonarAuth'
import { TOKEN } from '@config/sonarQube'

// TODO: usar auth provider
const client = new SonarDataSource(
  SonarAuth.localSonarAuth({ tokenOrUser: TOKEN })
)
// TODO: controlar errores
// TODO: diseniar servicio (Facede, adaptaer y/o proxy)

export const dataProvider: DataProvider = {
  async getList(_, params): Promise<GetListResult> {
    const responseData = await client.getIssues({
      pagination: params?.pagination.page,
    })

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
