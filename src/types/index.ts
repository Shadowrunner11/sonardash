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
  get<T = unknown, K = PojoType>(url: string, params?: K, headers?: IHeaders): Promise<T>
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

export type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization'

export enum HTTP_METHODS {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH',
  'DELETE' = 'DELETE',
  'OPTIONS' = 'OPTIONS',
}

export type PojoType = Record<string, string | number>

export interface ILogger {
  logInfo(info: unknown): void
  logError(error: Error): void
}
