import { AxiosFetchClient } from '../../../src/lib/service/FetchClient/AxiosFetchClient'
import { AxiosSimpleLogger } from '../../../src/lib/service/Logger'
import { IS_LOGGER_ENABLED } from '../../config'
import { ProjectDataController } from '../../../src/lib/controllers/ProjectsDataControllers'
import { DefaultClient } from '../../tools/DefaultClient'

const client = DefaultClient.getClient()
let projectController: ProjectDataController

beforeAll(() => {
  if (client instanceof AxiosFetchClient && IS_LOGGER_ENABLED) client.useLogger(AxiosSimpleLogger.instance())

  projectController = new ProjectDataController(client)
})

describe.skip('Issues controller', () => {
  test('getting projects', async () => {
    const result = await projectController.getAllProjects()

    expect(Array.isArray(result)).toBe(true)
  })
})
