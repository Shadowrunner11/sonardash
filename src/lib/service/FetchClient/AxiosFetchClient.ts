import Axios, { AxiosInstance } from 'axios'
import { buildMemoryStorage, AxiosStorage } from 'axios-cache-interceptor'
import { AuthParams, FetchClientOptions, IFetchClient, IHeaders, ILogger, PojoType } from '../../../types'
import { FetchClientWithHelpers } from './FetchClientWithHelpers'
import { AxiosCache } from '../../../lib/controllers/AxiosCache'

export class AxiosFetchClient extends FetchClientWithHelpers implements IFetchClient {
  private client: AxiosInstance
  storage: AxiosStorage
  constructor(options: FetchClientOptions) {
    const { baseURL, headers, auth } = options

    super(options)

    const storage = buildMemoryStorage()

    this.storage = storage

    this.client = new AxiosCache(
      Axios.create({
        baseURL,
        headers,
        auth,
      }),
      storage
    ).instance
  }

  override setAuthorization(authParams: Required<AuthParams>): void {
    this.client.defaults.auth = authParams
  }

  async get<T = unknown, K = PojoType>(
    url: string,
    params?: K,
    headers?: IHeaders,
    extraData?: PojoType
  ): Promise<T> {
    const { data } = await this.client.get<T>(url, {
      headers,
      params,
      ...extraData,
    })

    return data
  }

  async post<T = unknown, K = Record<string, unknown>>(
    url: string,
    body?: K,
    headers?: IHeaders
  ): Promise<T> {
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
