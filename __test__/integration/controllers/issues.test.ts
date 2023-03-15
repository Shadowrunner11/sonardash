import { DefaultClient } from '../../tools/DefaultClient'
import { AxiosFetchClient } from '../../../src/lib/service/FetchClient/AxiosFetchClient'
import { AxiosSimpleLogger } from '../../../src/lib/service/Logger'
import { IS_LOGGER_ENABLED } from '../../config'
import { FacetsDataController, ProjectDataController, IssuesDataController } from '../../../src/lib/controllers'
import { FacetProperties } from '../../../src/types/sonarQube/issue'

const client = DefaultClient.getClient()
let projectController: ProjectDataController
let projectKey: string
let facetsController: FacetsDataController

beforeAll(async () => {
  if (client instanceof AxiosFetchClient && IS_LOGGER_ENABLED) client.useLogger(AxiosSimpleLogger.instance())

  projectController = new ProjectDataController(client)
  const { components } = await projectController.getPaginatedProjects({
    page: 1,
    pageSize: 1,
  })

  const [ { key } ] = components

  projectKey = key

  facetsController = new FacetsDataController(client)
})

describe('Get data by one project', () => {
  test('getting authors by project', async () => {
    const result = await facetsController.getFacetsByProject(projectKey, FacetProperties.AUTHORS)

    expect(Array.isArray(result)).toBe(true)
  })

  test('getting issues by proyect', async () => {
    const { data } = await new IssuesDataController(client).getIssuesByProject(projectKey, { p: 1 })

    expect(Array.isArray(data)).toBe(true)
  })

  test('getting rules by project', async () => {
    const result = await facetsController.getFacetsByProject(projectKey, FacetProperties.RULES)

    expect(Array.isArray(result.values)).toBe(true)
  })

  test('getting types by project', async () => {
    const result = await facetsController.getFacetsByProject(projectKey, FacetProperties.TYPES)

    expect(Array.isArray(result)).toBe(true)
  })

  test('getting severities by project', async () => {
    const result = await facetsController.getFacetsByProject(projectKey, FacetProperties.SEVERITIES)

    expect(Array.isArray(result)).toBe(true)
  })

  test('getting files by project', async () => {
    const result = await facetsController.getFacetsByProject(projectKey, FacetProperties.FILES)

    expect(Array.isArray(result)).toBe(true)
  })
})
