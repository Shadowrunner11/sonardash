import { fetchUtils } from 'react-admin'
import { ParsedUrlQueryInput, stringify } from 'querystring'
import { FetchClientOptions, IFetchClient, IHeaders, PojoType } from 'src/types'
import { encode } from 'base-64'

const { fetchJson } = fetchUtils

export class ReactQueryClient implements IFetchClient {
  private options: FetchClientOptions
  constructor(options: FetchClientOptions) {
    this.options = options
  }

  private getAbsoluteURL(url: string) {
    return this.options.baseURL + url
  }

  private getAbsoluteURLWithParams<T = PojoType>(url: string, params?: T) {
    return `${this.getAbsoluteURL(url)}?${stringify(params as ParsedUrlQueryInput)}`
  }

  private get authHeader() {
    const { password = '', username } = this.options.auth ?? {}
    const authInfo = encode(`${username}:${password}`)

    return `Basic ${authInfo}`
  }

  async get<T = unknown, K = PojoType>(url: string, params?: K, headers?: IHeaders): Promise<T> {
    const { json }: { json: T } = await fetchJson(this.getAbsoluteURLWithParams(url, params), {
      headers: {
        ...headers,
        Authorization: this.authHeader,
      },
    })

    return json
  }

  async post<T = unknown, K = Record<string, unknown>>(url: string, body: K, headers?: IHeaders): Promise<T> {
    const { json }: { json: T } = await fetchJson(this.getAbsoluteURL(url), {
      body: JSON.stringify(body),
      headers,
    })

    return json
  }
}
