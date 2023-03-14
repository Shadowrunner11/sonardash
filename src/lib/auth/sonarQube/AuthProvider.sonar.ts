import type { AuthProvider } from 'react-admin'
import type { AuthParams, IFetchClient } from '../../../types'

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
    this.client.setAuthorization({ username: token, password })

    const { valid } = await this.client.get<AuthValidationResponse>('/authentication/validate')

    if (!valid) throw new Error('Not valid token')

    return valid
  }

  async login({ username, password }: AuthParams) {
    const isValid = await this.validateToken(username, password)

    localStorage?.setItem('token', username)

    return isValid
  }

  logout() {
    localStorage?.removeItem('token')
    return Promise.resolve()
  }

  async checkAuth() {
    const currentToken = localStorage?.getItem('token')

    if (!currentToken) return Promise.reject('Not Valid tokein')

    await this.validateToken(currentToken)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkError(error: any) {
    if (error?.status >= 500) return Promise.reject()

    return Promise.resolve()
  }

  getPermissions() {
    return Promise.resolve()
  }
}
