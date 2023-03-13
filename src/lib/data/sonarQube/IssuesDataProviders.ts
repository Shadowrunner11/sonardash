import {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
} from 'react-admin'

import { NotImplementeError } from '../../../lib/errors'
import { IssuesDataController } from '../../../lib/controllers/IssuesDataController'
import { exposeToGlobal, getFirstLanguageFromFile } from '../../../utils'

export class IssuesDataProvider implements DataProvider {
  private issuesController: IssuesDataController
  constructor(issuesController: IssuesDataController) {
    this.issuesController = issuesController
  }

  async getListByParams(params: GetListParams) {
    const {
      pagination: { page, perPage },
      filter,
    } = params

    if (perPage > 500 && page === 1) return this.issuesController.getAllIssuesLikePagination()

    return this.issuesController.getPaginatedIssues({
      pageSize: perPage,
      page,
      filters: filter,
    })
  }

  async getList(resource: string, params: GetListParams): Promise<GetListResult> {
    const { data: issues, pageInfo } = await this.getListByParams(params)

    const data = issues.map(({ key, component, creationDate, ...rest }) => ({
      id: key,
      ...rest,
      component,
      language: getFirstLanguageFromFile(component),
      creationDate: new Date(creationDate).toLocaleString('es-ES'),
    }))

    exposeToGlobal(data[0].language, 'dataIssue')

    const { total, pageIndex, pageSize } = pageInfo

    const hasNextPage = pageIndex !== Math.round(total / pageSize) && pageIndex !== 100

    const hasPreviousPage = pageIndex !== 0

    return { data, pageInfo: { hasNextPage, hasPreviousPage }, total }
  }

  getOne(resource: string, params: GetOneParams): never {
    throw new NotImplementeError(String(params))
  }

  getMany(resource: string, params: GetManyParams): never {
    throw new NotImplementeError(String(params))
  }

  getManyReference(resource: string, params: GetManyReferenceParams): never {
    throw new NotImplementeError(String(params))
  }

  update(resource: string, params: UpdateParams): never {
    throw new NotImplementeError(String(params))
  }

  updateMany(resource: string, params: UpdateManyParams): never {
    throw new NotImplementeError(String(params))
  }

  create(resource: string, params: CreateParams): never {
    throw new NotImplementeError(String(params))
  }

  delete(resource: string, params: DeleteParams): never {
    throw new NotImplementeError(String(params))
  }

  deleteMany(resource: string, params: DeleteManyParams): never {
    throw new NotImplementeError(String(params))
  }
}
