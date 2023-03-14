import { fetchUtils } from 'react-admin'

import { FetchClientOptions, IFetchClient, IHeaders, PojoType } from '../../../types'
import { FetchClientWithHelpers } from './FetchClientWithHelpers'

const { fetchJson } = fetchUtils

export class ReactQueryClient extends FetchClientWithHelpers implements IFetchClient {
  constructor(options: FetchClientOptions) {
    super(options)
  }

  async get<T = unknown, K = PojoType>(url: string, params?: K, headers?: IHeaders): Promise<T> {
    const _headers = new Headers({
      ...headers,
      Authorization: this.authHeader,
    })
    const { json }: { json: T } = await fetchJson(this.getAbsoluteURLWithParams(url, params), {
      headers: _headers,
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
