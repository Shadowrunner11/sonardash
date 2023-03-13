import { DefaultClient } from '../../tools/DefaultClient'
import { AxiosFetchClient } from '../../../src/lib/service/FetchClient/AxiosFetchClient'
import { IssuesDataController } from '../../../src/lib/controllers/IssuesDataController'
import { AxiosSimpleLogger } from '../../../src/lib/service/Logger'
import { IS_LOGGER_ENABLED } from '../../config'
import { ProjectDataController } from '../../../src/lib/controllers/ProjectsDataControllers'
import { AuthorsDataController } from '../../../src/lib/controllers/AuthorsDataController'
import { RulesDataController } from '../../../src/lib/controllers/RulesDataController'

const client = DefaultClient.getClient()
let projectController: ProjectDataController
let projectKey: string

beforeAll(async () => {
  if (client instanceof AxiosFetchClient && IS_LOGGER_ENABLED) client.useLogger(AxiosSimpleLogger.instance())

  projectController = new ProjectDataController(client)
  const { components } = await projectController.getPaginatedProjects({
    page: 1,
    pageSize: 1,
  })

  const [ { key } ] = components

  projectKey = key
})

describe('Get data by one project', () => {
  test('getting authors by project', async () => {
    const result = await new AuthorsDataController(client).getAuthorsByProject(projectKey)

    expect(Array.isArray(result)).toBe(true)
  })

  test('getting issues by proyect', async () => {
    const { data } = await new IssuesDataController(client).getIssuesByProject(projectKey, { p: 1 })

    expect(Array.isArray(data)).toBe(true)
  })

  test.only('getting rules by project', async () => {
    const controller = new RulesDataController(client)
    const result = await controller.getRulesByProject(projectKey)

    expect(Array.isArray(result)).toBe(true)
  })
})
