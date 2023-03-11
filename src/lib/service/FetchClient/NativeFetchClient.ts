import { stringifySearchParams } from '../../../utils'
import { FetchClientOptions, HTTP_METHODS, IFetchClient, IHeaders, PojoType } from '../../../types'
import { encode } from 'base-64'

export class NativeFetchClient implements IFetchClient {
  private options: FetchClientOptions
  constructor(options: FetchClientOptions) {
    this.options = options
  }

  private getAbsoluteURL(url: string) {
    return this.options.baseURL + url
  }

  private getAbsoluteURLWithParams<T = PojoType>(url: string, params?: T) {
    const strigifiedParams = stringifySearchParams(params)

    return `${this.getAbsoluteURL(url)}?${strigifiedParams}`
  }

  private get authHeader() {
    const { password = '', username } = this.options.auth ?? {}
    const authInfo = encode(`${username}:${password}`)

    return `Basic ${authInfo}`
  }

  async get<T = unknown, K = PojoType>(url: string, params?: K, headers?: IHeaders): Promise<T> {
    const _headers = new Headers({
      authorization: this.authHeader,
      ...headers,
    })

    const rawData = await fetch(this.getAbsoluteURLWithParams(url, params), {
      credentials: 'include',
      headers: _headers,
    })

    const json: T = await rawData.json()

    return json
  }

  async post<T = unknown, K = Record<string, unknown>>(url: string, body: K, headers?: IHeaders): Promise<T> {
    const rawData = await fetch(this.getAbsoluteURL(url), {
      method: HTTP_METHODS.POST,
      headers: {
        ...headers,
        Authorization: this.authHeader,
      },
    })

    const json: T = await rawData.json()

    return json
  }
}
