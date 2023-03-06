import { AuthParams, IAuth } from 'src/types'

// TODO: desacoplar el token de las envs por el servicio de ATH, autowitre con un DTO de los data providers
export class SonarAuth implements IAuth {
  private static localAuthIntance?: IAuth
  private tokenOrUser: string
  private password?: string
  private constructor(tokenOrUser: string, password?: string) {
    this.password = password
    this.tokenOrUser = tokenOrUser
  }

  cleanAuth() {
    SonarAuth.localAuthIntance = undefined
  }

  getAuthAxios() {
    return {
      auth: { username: this.tokenOrUser, password: this.password ?? '' },
    }
  }

  static localSonarAuth(authtParams: AuthParams) {
    SonarAuth.localAuthIntance ??= new SonarAuth(
      authtParams.tokenOrUser,
      authtParams.password
    )

    return SonarAuth.localAuthIntance
  }
}
