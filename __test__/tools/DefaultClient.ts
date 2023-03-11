import { FetchClientOptions } from '../../src/types'
import { AxiosFetchClient } from '../../src/lib/service/AxiosFetchClient'
import { TOKEN, API_URL } from '../config/sonar'

export class DefaultClient extends AxiosFetchClient {
  private static defaultInstance: DefaultClient

  private constructor(options: FetchClientOptions) {
    super(options)
  }

  static getClient() {
    if (!TOKEN || !API_URL)
      throw new Error('There not envs to create a client, please check configuration and set proper .env file')

    DefaultClient.defaultInstance =
      DefaultClient.defaultInstance ??
      new DefaultClient({
        baseURL: API_URL,
        auth: {
          password: '',
          username: TOKEN,
        },
      })

    return DefaultClient.defaultInstance
  }
}
