import { FetchSonarClientFactory } from '../../../lib/service/FetchClient/FetchClient.factory'
import { IssuesDataController } from '../../../lib/controllers/IssuesDataController'
import { ProjectDataController } from '../../../lib/controllers/ProjectsDataControllers'
import { SonarQubeDataProvider } from './SonarqubeDataProvider'
import { ProjectsDataProvider } from './ProjectsDataProvider'
import { FacetProperties } from '../../../types/sonarQube/issue'
import { AuthorsDataProvider } from './AuthorsDataProvider'
import { AuthorsDataController } from '../../../lib/controllers/AuthorsDataController'
import { IssuesDataProvider } from './IssuesDataProviders'

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
