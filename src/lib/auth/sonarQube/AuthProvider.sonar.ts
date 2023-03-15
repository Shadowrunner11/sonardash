import type { AuthProvider } from 'react-admin'
import type { AuthParams, IFetchClient } from '../../../types'
import { AxiosFetchClient } from '../../../lib/service/FetchClient/AxiosFetchClient'

interface AuthValidationResponse {
  valid: boolean
}

// TODO: Auth repsonsbilities like setting on localstoarge should be separated
export class AuthSonarProvider implements AuthProvider {
  private client: IFetchClient

  constructor(client: IFetchClient) {
    this.client = client
  }

  private async validateToken(token: string, password = '') {
    this.client.setAuthorization({ username: token.trim(), password: password.trim() })

    const { valid } = await this.client.get<AuthValidationResponse>(
      '/authentication/validate',
      undefined,
      undefined,
      { id: 'login' }
    )

    if (!valid) throw new Error('Not valid token')

    return valid
  }

  async login({ username, password }: AuthParams) {
    const isValid = await this.validateToken(username, password)

    localStorage?.setItem('token', username)

    return isValid
  }

  async logout() {
    localStorage?.removeItem('token')

    if (this.client instanceof AxiosFetchClient) await this.client.storage.remove('login')
  }

  async checkAuth() {
    //if there is no valid token simply backend would not respond, but validation shpuld be performed so
    // there is need to decouple this part
    // it was coliding asincronusly when refreshing
    if (localStorage.getItem('token')) return

    // here shpuld be performed auth without re writing auth options in client

    throw new Error('Not valid')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkError(error: any) {
    if (error?.status >= 500) return Promise.reject(error)

    return Promise.resolve()
  }

  getPermissions() {
    return Promise.resolve()
  }
}
