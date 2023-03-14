import { encode } from 'base-64'
import { AuthParams, FetchClientOptions, PojoType } from '../../../types'
import { stringifySearchParams } from '../../..//utils'

export class FetchClientWithHelpers {
  protected options: FetchClientOptions

  constructor(options: FetchClientOptions) {
    this.options = options
  }

  setAuthorization(authParams: Required<AuthParams>): void {
    this.options.auth = authParams
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
    let authInfo = encode(`${username}:${password}`)

    if (!authInfo.includes('=')) authInfo = authInfo.substring(0, authInfo.length - 1)

    return `Basic ${authInfo}`
  }
}
