import Axios, { AxiosInstance } from 'axios'
import { FetchClientOptions, IFetchClient, IHeaders, PojoType } from '../../types'

export interface ILogger {
  logInfo(info: unknown): void
  logError(error: Error): void
}

export class AxiosFetchClient implements IFetchClient {
  private client: AxiosInstance
  constructor({ baseURL, headers, auth }: FetchClientOptions) {
    this.client = Axios.create({
      baseURL,
      headers,
      auth,
    })
  }

  async get<T = unknown, K = PojoType>(url: string, params?: K, headers?: IHeaders): Promise<T> {
    const { data } = await this.client.get<T>(url, {
      headers,
      params,
    })

    return data
  }

  async post<T = unknown, K = Record<string, unknown>>(url: string, body?: K, headers?: IHeaders): Promise<T> {
    const { data } = await this.client.post<T>(url, body, {
      headers,
    })

    return data
  }

  useLogger(logger: ILogger) {
    function logError(error: Error) {
      logger.logError(error)

      Promise.reject(error)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function logInfo(requestOrResponse: any) {
      logger.logInfo(requestOrResponse)

      return requestOrResponse
    }

    const interceptors = this.client.interceptors

    interceptors.request.use(logInfo, logError)

    interceptors.response.use(logInfo, logError)
  }
}
