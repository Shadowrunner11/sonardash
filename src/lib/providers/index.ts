import { FacetProperties } from '../../types/sonarQube/issue'
import { FetchSonarClientFactory } from '../../lib/service/FetchClient/FetchClient.factory'
import { IssuesDataController, ProjectDataController, FacetsDataController } from '../../lib/controllers'
import { SonarQubeDataProvider, IssuesDataProvider, ProjectsDataProvider, FacetDataProvider } from '../data/sonarQube'
import { AuthSonarProvider } from '../auth/sonarQube/AuthProvider.sonar'

// TODO: usar auth provider
// TODO: controlar errores
// TODO: diseniar servicio (Facede, adaptaer y/o proxy)

const client = FetchSonarClientFactory.getFetchClient()
/* const issueController = new IssuesDataController(client)
const authorsController = new AuthorsDataController(client) */
const facetsProvider = new FacetDataProvider(new FacetsDataController(client))
// TODO: what if facets are not here and in main provider
const createFacetProviders = () => {
  return Object.values(FacetProperties).reduce(
    (prevPojo: Record<string, FacetDataProvider>, facetProperty: FacetProperties) => {
      prevPojo[facetProperty] = facetsProvider

      return prevPojo
    },
    {}
  )
}

export const authProvider = new AuthSonarProvider(client)

// TODO: pasar a enums los resources
export const dataProvider = new SonarQubeDataProvider({
  projects: new ProjectsDataProvider(new ProjectDataController(client)),
  issues: new IssuesDataProvider(new IssuesDataController(client)),
  ...createFacetProviders(),
})
