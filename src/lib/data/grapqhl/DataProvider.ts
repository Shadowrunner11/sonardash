import {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
} from 'react-admin'
import { GraphlService } from '../../../types'

export class GraphQlDataProvider implements DataProvider {
  constructor(private dataProviderAdapters: Record<string, GraphlService>) {}

  getList(resource: string, params: GetListParams) {
    return this.dataProviderAdapters[resource].getList(params)
  }

  getOne(resource: string, params: GetOneParams) {
    return Promise.reject(resource + JSON.stringify(params))
  }

  getMany(resource: string, params: GetManyParams) {
    return Promise.reject(resource + JSON.stringify(params))
  }

  getManyReference(resource: string, params: GetManyReferenceParams) {
    return Promise.reject(resource + JSON.stringify(params))
  }

  update(resource: string, params: UpdateParams) {
    return Promise.reject(resource + JSON.stringify(params))
  }

  updateMany(resource: string, params: UpdateManyParams) {
    return Promise.reject(resource + JSON.stringify(params))
  }

  create(resource: string, params: CreateParams) {
    return Promise.reject(resource + JSON.stringify(params))
  }

  delete(resource: string, params: DeleteParams) {
    return Promise.reject(resource + JSON.stringify(params))
  }

  deleteMany(resource: string, params: DeleteManyParams) {
    return Promise.reject(resource + JSON.stringify(params))
  }
}
