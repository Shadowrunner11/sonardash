import Axios, { AxiosInstance } from 'axios'
import { FetchClientOptions, IFetchClient, IHeaders } from 'src/types'

export class AxiosFetchClient implements IFetchClient {
  private client: AxiosInstance
  constructor({ baseURL, headers, auth }: FetchClientOptions) {
    this.client = Axios.create({
      baseURL,
      headers,
      auth,
    })
  }

  async get<T = unknown>(
    url: string,
    params?: Record<string, string | number>,
    headers?: IHeaders | undefined
  ): Promise<T> {
    const { data } = await this.client.get<T>(url, {
      headers,
      params,
    })

    return data
  }

  async post<T = unknown>(
    url: string,
    body?: Record<string, unknown>,
    headers?: IHeaders | undefined
  ): Promise<T> {
    const { data } = await this.client.post<T>(url, body, {
      headers,
    })

    return data
  }
}
