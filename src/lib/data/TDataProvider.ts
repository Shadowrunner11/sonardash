import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin'

import { NotImplementeError } from '../../lib/errors'

export abstract class TDataProvider implements DataProvider {
  getList(_resource: string, params: GetListParams): Promise<GetListResult> {
    throw new NotImplementeError(String(params))
  }

  getOne(_resource: string, params: GetOneParams): Promise<GetOneResult> {
    throw new NotImplementeError(String(params))
  }

  getMany(_resource: string, params: GetManyParams): Promise<GetManyResult> {
    throw new NotImplementeError(String(params))
  }

  getManyReference(_resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult> {
    throw new NotImplementeError(String(params))
  }

  update(_resource: string, params: UpdateParams): Promise<UpdateResult> {
    throw new NotImplementeError(String(params))
  }

  updateMany(_resource: string, params: UpdateManyParams): Promise<UpdateManyResult> {
    throw new NotImplementeError(String(params))
  }

  create(_resource: string, params: CreateParams): Promise<CreateResult> {
    throw new NotImplementeError(String(params))
  }

  delete(_resource: string, params: DeleteParams): Promise<DeleteResult> {
    throw new NotImplementeError(String(params))
  }

  deleteMany(_resource: string, params: DeleteManyParams): Promise<DeleteManyResult> {
    throw new NotImplementeError(String(params))
  }
}
