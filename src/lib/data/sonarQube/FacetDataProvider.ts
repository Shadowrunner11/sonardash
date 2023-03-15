import type {
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
import type { FacetsDataController } from '../../../lib/controllers'
import type { FacetProperties } from 'src/types/sonarQube/issue'

export class FacetDataProvider implements DataProvider {
  protected facetsDataController: FacetsDataController

  constructor(facetsController: FacetsDataController) {
    this.facetsDataController = facetsController
  }

  async getList(resource: string, params: GetListParams): Promise<GetListResult> {
    const { filter } = params

    const result = await this.facetsDataController.getFacetsByProject(filter.project, resource as FacetProperties)

    const data = result.values.map(({ val, count }) => ({
      id: val,
      val,
      count,
    }))

    return { data, total: 10000 }
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
