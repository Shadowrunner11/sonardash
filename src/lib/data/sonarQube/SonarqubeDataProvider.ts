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

export class SonarQubeDataProvider implements DataProvider {
  private dataProviderAdapters: Record<string, DataProvider>
  constructor(dataProviderAdapters: Record<string, DataProvider>) {
    this.dataProviderAdapters = dataProviderAdapters
  }

  getList(resource: string, params: GetListParams) {
    return this.dataProviderAdapters[resource].getList(resource, params)
  }

  getOne(resource: string, params: GetOneParams) {
    return this.dataProviderAdapters[resource].getOne('', params)
  }

  getMany(resource: string, params: GetManyParams) {
    return this.dataProviderAdapters[resource].getMany('', params)
  }

  getManyReference(resource: string, params: GetManyReferenceParams) {
    return this.dataProviderAdapters[resource].getManyReference('', params)
  }

  update(resource: string, params: UpdateParams) {
    return this.dataProviderAdapters[resource].update('', params)
  }

  updateMany(resource: string, params: UpdateManyParams) {
    return this.dataProviderAdapters[resource].updateMany('', params)
  }

  create(resource: string, params: CreateParams) {
    return this.dataProviderAdapters[resource].create('', params)
  }

  delete(resource: string, params: DeleteParams) {
    return this.dataProviderAdapters[resource].delete('', params)
  }

  deleteMany(resource: string, params: DeleteManyParams) {
    return this.dataProviderAdapters[resource].deleteMany('', params)
  }
}
