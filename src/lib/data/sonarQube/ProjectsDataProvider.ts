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
import { ProjectDataController } from '../../../lib/controllers/ProjectsDataControllers'
import { NotImplementeError } from '../../../lib/errors'

export class ProjectsDataProvider implements DataProvider {
  private projectController: ProjectDataController
  constructor(projectController: ProjectDataController) {
    this.projectController = projectController
  }

  // TODO: create another way to detected that there is an intention to get all
  async getListByParams(params: GetListParams) {
    const {
      pagination: { page, perPage },
      filter,
    } = params

    if (perPage > 500 && page === 1) return this.projectController.getAllProjectsLikePagination()

    return this.projectController.getPaginatedProjects({
      pageSize: perPage,
      page,
      filter,
    })
  }

  async getList(resource: string, params: GetListParams): Promise<GetListResult> {
    const { components, paging } = await this.getListByParams(params)

    const data = components.map(({ key, ...rest }) => ({
      id: key,
      ...rest,
    }))

    const { total, pageIndex, pageSize } = paging

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
