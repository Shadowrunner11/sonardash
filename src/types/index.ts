export interface IAuth {
  getAuthAxios():
    | Record<string, { username: string; password: string }>
    | undefined
  cleanAuth(): void
}

export interface AuthParams {
  tokenOrUser: string
  password?: string
}
