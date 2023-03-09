import { fetchUtils } from 'react-admin'
import { stringify } from 'querystring'
import { FetchClientOptions, IFetchClient, IHeaders } from 'src/types'

const { fetchJson } = fetchUtils

export class ReactQueryClient implements IFetchClient {
  private options: FetchClientOptions
  constructor(options: FetchClientOptions) {
    this.options = options
  }

  private getAbsoluteURL(url: string) {
    return this.options.baseURL + url
  }

  private getAbsoluteURLWithParams(
    url: string,
    params?: Record<string, string | number>
  ) {
    return `${this.getAbsoluteURL(url)}?${stringify(params)}`
  }

  async get<T = unknown>(
    url: string,
    params?: Record<string, string | number> | undefined,
    headers?: IHeaders | undefined
  ): Promise<T> {
    const { json }: { json: T } = await fetchJson(
      this.getAbsoluteURLWithParams(url, params),
      {
        headers,
      }
    )

    return json
  }

  async post<T = unknown>(
    url: string,
    body: Record<string, unknown>,
    headers?: IHeaders | undefined
  ): Promise<T> {
    const { json }: { json: T } = await fetchJson(this.getAbsoluteURL(url), {})

    return json
  }
}
