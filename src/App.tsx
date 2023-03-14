import { Resource } from 'react-admin'
import AdminSonarQube from './layout/AdminSonarQube'
import { lazy } from 'react'
import { DefaultLazy } from './components/DefaultLazy'

const LazyIssueList = lazy(() => import('./components/IssueList'))
const LazyProjectList = lazy(() => import('./components/ProjectsList'))

function App() {
  return (
    <AdminSonarQube>
      <Resource
        name='issues'
        list={
          <DefaultLazy>
            <LazyIssueList />
          </DefaultLazy>
        }
      />
      <Resource
        name='projects'
        list={
          <DefaultLazy>
            <LazyProjectList />
          </DefaultLazy>
        }
      />
    </AdminSonarQube>
  )
}

export default App
