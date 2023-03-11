import { IFetchClient } from '../../../types'
import { FetchClientStrategy } from '../../../types/fetchClient'
import { AxiosFetchClient } from './AxiosFetchClient'
import { ReactQueryClient } from './ReactQueryClient'
import { NotImplementeError } from '../../../lib/errors'
import { defaultSonarClientConfig, getFetchClientStreategy } from '@config/fetchClient'
import { NativeFetchClient } from './NativeFetchClient'

export class FetchSonarClientFactory {
  private static instance: IFetchClient
  private static getFetchClientByStrategy(strategy: FetchClientStrategy): IFetchClient {
    switch (strategy) {
    case FetchClientStrategy.AXIOS:
      return new AxiosFetchClient(defaultSonarClientConfig)
    case FetchClientStrategy.REACT_QUERY:
      return new ReactQueryClient(defaultSonarClientConfig)
    case FetchClientStrategy.NATIVE:
      return new NativeFetchClient(defaultSonarClientConfig)
    default:
      throw new NotImplementeError()
    }
  }

  static getFetchClient() {
    const { instance } = FetchSonarClientFactory

    if (instance) return instance

    const currentStrategy = getFetchClientStreategy()

    const newInstace = FetchSonarClientFactory.getFetchClientByStrategy(currentStrategy)

    FetchSonarClientFactory.instance = newInstace

    return newInstace
  }
}
