/* eslint-disable no-console */
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ILogger } from './AxiosFetchClient'
import { PojoType } from 'src/types'

export class SimpleLogger<T = unknown> implements ILogger {
  logInfo(info: T): void {
    console.info(info)
  }
  logError(error: Error): void {
    console.error(error)
  }
}

export class AxiosSimpleLogger extends SimpleLogger<AxiosRequestConfig | AxiosResponse> {
  private static defaultInstance?: AxiosSimpleLogger
  private maxArrayLength = 2
  private constructor() {
    super()
  }

  private minifyArray(array: unknown[]) {
    return array.slice(0, this.maxArrayLength)
  }

  private parsePojoResponse(pojo: PojoType) {
    const parsedPojo: Record<string, unknown> = {}
    for (const key in pojo) {
      if (Object.prototype.hasOwnProperty.call(pojo, key)) {
        const element = pojo[key]
        parsedPojo[key] = Array.isArray(element) ? this.minifyArray(element) : element
      }
    }

    return JSON.stringify(parsedPojo, null, 2)
  }

  override logInfo(info: AxiosRequestConfig & AxiosResponse): void {
    const { url, baseURL, method, data } = info

    if (url) {
      console.info('Request')
      return super.logInfo({ url, baseURL, method })
    }

    console.info('Response')

    return super.logInfo({ data: this.parsePojoResponse(data) })
  }

  static instance() {
    AxiosSimpleLogger.defaultInstance = AxiosSimpleLogger.defaultInstance ?? new AxiosSimpleLogger()

    return AxiosSimpleLogger.defaultInstance
  }
}
