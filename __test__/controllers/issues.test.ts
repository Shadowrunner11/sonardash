import { API_URL, TOKEN } from '../config/sonar'
import { AxiosFetchClient } from '../../src/lib/service/AxiosFetchClient'
import { IssuesDataController } from '../../src/lib/controllers/IssuesDataController'

let client: AxiosFetchClient
beforeAll(() => {
  client = new AxiosFetchClient({
    baseURL: API_URL!,
    auth: {
      password: '',
      username: TOKEN!,
    },
  })
})

describe('Issues controller', () => {
  test('getting projects', async () => {
    const issueController = new IssuesDataController(client)

    const result = await issueController.getAllProjects()
    console.log('🚀 ~ file: issues.test.ts:18 ~ test ~ result:', result)

    expect(Array.isArray(result)).toBe(true)
  })

  test.only('getting authors', async () => {
    const issueController = new IssuesDataController(client)

    const result = await issueController.getAuthorsByProject(
      'be-portal-somos-corredores-pga-dxp:modules:admin:admin-broker-services:admin-broker-services-api'
    )

    console.log('🚀 ~ file: issues.test.ts:18 ~ test ~ result:', result)
    expect(Array.isArray(result)).toBe(true)
  })

  test('getting rules', async () => {
    const issueController = new IssuesDataController(client)

    const result = await issueController.getRulesByProject
  })
})
