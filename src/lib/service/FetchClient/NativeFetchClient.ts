import { FetchClientOptions, HTTP_METHODS, IFetchClient, IHeaders, PojoType } from '../../../types'
import { FetchClientWithHelpers } from './FetchClientWithHelpers'

export class NativeFetchClient extends FetchClientWithHelpers implements IFetchClient {
  constructor(options: FetchClientOptions) {
    super(options)
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
