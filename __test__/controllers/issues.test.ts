import { API_URL, TOKEN } from '../config/sonar'
import { AxiosFetchClient } from '../../src/lib/service/AxiosFetchClient'
import { IssuesDataController } from '../../src/lib/controllers/IssuesDataController'

describe('Issues controller', () => {
  test('getting projects', async () => {
    const client = new AxiosFetchClient({
      baseURL: API_URL!,
      auth: {
        password: '',
        username: TOKEN!,
      },
    })

    const issueController = new IssuesDataController(client)

    const result = await issueController.getAllProjects()

    expect(Array.isArray(result)).toBe(true)
  })
})
