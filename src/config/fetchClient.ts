import { FetchClientOptions } from '../types'
import { FetchClientStrategy } from '../types/fetchClient'
import { API_URL, initialAuthOptions } from './sonarQube'

export const rawfetchClientStrategy = import.meta.env.VITE_CLIENT_STRATEGY || FetchClientStrategy.AXIOS

export function getFetchClientStreategy(): FetchClientStrategy {
  if (!Object.values(FetchClientStrategy).includes(rawfetchClientStrategy))
    throw new Error('Not acceptable value for fetching strategy')

  return rawfetchClientStrategy
}

export const defaultSonarClientConfig: FetchClientOptions = {
  baseURL: API_URL,
  ...initialAuthOptions,
}
