import { DefaultClient } from '../../tools/DefaultClient'
import { AuthSonarProvider } from '../../../src/lib/auth/sonarQube/AuthProvider.sonar'
import { TOKEN } from '../../config/sonar'
import { AxiosFetchClient } from '../../../src/lib/service/FetchClient/AxiosFetchClient'
import { IS_LOGGER_ENABLED } from '../../config'
import { AxiosSimpleLogger } from '../../../src/lib/service/Logger'

const client = DefaultClient.getClient()
const authProvider = new AuthSonarProvider(client)

beforeAll(() => {
  if (client instanceof AxiosFetchClient && IS_LOGGER_ENABLED) client.useLogger(AxiosSimpleLogger.instance())
})

describe.only('Auth', () => {
  test('Login', async () => {
    const isValid = await authProvider.login({ username: TOKEN! })

    expect(isValid).toBe(true)
  })
})
