import { FacetProperties } from '../../types/sonarQube/issue'
import { FetchSonarClientFactory } from '../../lib/service/FetchClient/FetchClient.factory'
import { IssuesDataController, AuthorsDataController, ProjectDataController } from '../../lib/controllers'
import { SonarQubeDataProvider, AuthorsDataProvider, IssuesDataProvider, ProjectsDataProvider } from '../data/sonarQube'
import { AuthSonarProvider } from '../auth/sonarQube/AuthProvider.sonar'

// TODO: usar auth provider
// TODO: controlar errores
// TODO: diseniar servicio (Facede, adaptaer y/o proxy)

const client = FetchSonarClientFactory.getFetchClient()
/* const issueController = new IssuesDataController(client)
const authorsController = new AuthorsDataController(client) */

// TODO: pasar a enums los resources
export const dataProvider = new SonarQubeDataProvider({
  projects: new ProjectsDataProvider(new ProjectDataController(client)),
  [FacetProperties.AUTHORS]: new AuthorsDataProvider(new AuthorsDataController(client)),
  issues: new IssuesDataProvider(new IssuesDataController(client)),
})

export const authProvider = new AuthSonarProvider(client)
