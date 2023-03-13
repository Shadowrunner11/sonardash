import { AuthParams } from 'src/types'

export const TOKEN: string = import.meta.env.VITE_SONAR_TOKEN

export const API_URL = import.meta.env.VITE_API_URL_SONAR || 'https://sonarqube.innovacionpacifico.com/api'

export const initialAuthOptions: { auth?: Required<AuthParams> } = Object.freeze(
  TOKEN
    ? {
      auth: {
        password: '',
        username: TOKEN,
      },
    }
    : {}
)
