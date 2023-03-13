import { Admin, Resource } from 'react-admin'
import { dataProvider } from './lib/data/sonarQube'
import { ProjectList } from './components/ProjectsList'
import { IssuesList } from './components/IssueList'

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name='issues' list={IssuesList} />
      <Resource name='projects' list={ProjectList} />
    </Admin>
  )
}

export default App
