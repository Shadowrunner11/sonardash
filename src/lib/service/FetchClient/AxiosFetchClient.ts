import Axios, { AxiosInstance } from 'axios'
import { setupCache, buildMemoryStorage } from 'axios-cache-interceptor/dev'
import { FetchClientOptions, IFetchClient, IHeaders, ILogger, PojoType } from '../../../types'
import { exposeToGlobal } from '../../../utils'
import { FetchClientWithHelpers } from './FetchClientWithHelpers'

export class AxiosFetchClient extends FetchClientWithHelpers implements IFetchClient {
  private client: AxiosInstance
  constructor(options: FetchClientOptions) {
    const { baseURL, headers, auth } = options

    super(options)

    const storage = buildMemoryStorage()
    exposeToGlobal(storage, 'axiosStorage')

    this.client = setupCache(
      Axios.create({
        baseURL,
        headers,
        auth,
      }),
      // eslint-disable-next-line no-console
      { debug: console.log, storage, interpretHeader: false }
    )
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
