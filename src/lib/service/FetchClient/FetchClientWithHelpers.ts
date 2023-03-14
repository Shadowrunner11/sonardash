import { encode } from 'base-64'
import { FetchClientOptions, PojoType } from '../../../types'
import { stringifySearchParams } from '../../..//utils'

export class FetchClientWithHelpers {
  protected options: FetchClientOptions

  constructor(options: FetchClientOptions) {
    this.options = options
  }

  protected getAbsoluteURL(url: string) {
    return this.options.baseURL + url
  }

  protected getAbsoluteURLWithParams<T = PojoType>(url: string, params?: T) {
    const strigifiedParams = stringifySearchParams(params)

    return `${this.getAbsoluteURL(url)}?${strigifiedParams}`
  }

  protected get authHeader() {
    const { password = '', username } = this.options.auth ?? {}
    const authInfo = encode(`${username}:${password}`)

    return `Basic ${authInfo}`
  }
}
