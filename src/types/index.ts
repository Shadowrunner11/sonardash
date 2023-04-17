import type {
  GetListParams,
  GetListResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin'
import type { PaginationInfo } from 'src/__generated__/graphql'

export interface IAuth {
  getAuthAxios(): Record<string, { username: string; password: string }> | undefined
  cleanAuth(): void
}

export interface AuthParams {
  username: string
  password?: string
}

export type IHeaders = Partial<{ [key in CommonRequestHeadersList]: string }> & Record<string, string>

export interface IFetchClient {
  setAuthorization(authParams: AuthParams): void
  get<T = unknown, K = PojoType>(
    url: string,
    params?: K,
    headers?: IHeaders,
    extraData?: PojoType
  ): Promise<T>
  post<T = unknown, K = Record<string, unknown>>(url: string, body: K, headers?: IHeaders): Promise<T>
}

export interface RequestLogInfo {
  basicURL: string
  url: string
  method: HTTP_METHODS
}

export interface FetchClientOptions {
  baseURL: string
  headers?: IHeaders
  auth?: Required<AuthParams>
}

export type CommonRequestHeadersList =
  | 'Accept'
  | 'Content-Length'
  | 'User-Agent'
  | 'Content-Encoding'
  | 'Authorization'

export enum HTTP_METHODS {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH',
  'DELETE' = 'DELETE',
  'OPTIONS' = 'OPTIONS',
}

export type PojoType = Record<string, string | number | unknown>

export interface ILogger {
  logInfo(info: unknown): void
  logError(error: Error): void
}

export interface PaginatedResponse<T = unknown> {
  data: T[]
  pagination: Partial<PaginationInfo>
}
export interface GraphqlService {
  getList(params: GetListParams): Promise<GetListResult>
  update(params: UpdateParams): Promise<UpdateResult>
  updateMany(params: UpdateManyParams): Promise<UpdateManyResult>
}
