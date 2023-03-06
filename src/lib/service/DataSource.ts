import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IAuth } from 'src/types'
import { cleanPojo } from '../../utils'

export abstract class DataSource {
  client: AxiosInstance
  constructor(baseURL: string, auth: IAuth, extraOptions?: AxiosRequestConfig) {
    this.client = Axios.create({
      baseURL,
      ...auth.getAuthAxios(),
      ...extraOptions,
    })
  }

  async get<T = unknown>(
    url: string,
    params?: Record<string, string | number | undefined>
  ) {
    const { data } = await this.client.get<T>(url, {
      params: cleanPojo(params ?? {}),
    })
    return data
  }

  async post<T = unknown>(url: string, dataRequest: Record<string, unknown>) {
    const { data } = await this.client.post<T>(url, cleanPojo(dataRequest))

    return data
  }
}
