export interface IAuth {
  getAuthAxios():
    | Record<string, { username: string; password: string }>
    | undefined
  cleanAuth(): void
}

export interface AuthParams {
  username: string
  password?: string
}

export type IHeaders = Partial<{ [key in CommonRequestHeadersList]: string }> &
  Record<string, string>

export interface IFetchClient {
  get<T = unknown>(
    url: string,
    params?: Record<string, string | number>,
    headers?: IHeaders
  ): T | Promise<T>
  post<T = unknown>(
    url: string,
    body: Record<string, unknown>,
    headers?: IHeaders
  ): T | Promise<T>
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
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}
