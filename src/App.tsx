import { Resource } from 'react-admin'
import AdminSonarQube from './layout/AdminSonarQube'
import { lazy } from 'react'
import { DefaultLazy } from './components/DefaultLazy'
import { BrowserRouter } from 'react-router-dom'

const LazyIssueList = lazy(() => import('./components/IssueList'))
const LazyProjectList = lazy(() => import('./components/ProjectsList'))
const LazyAuthorsList = lazy(() => import('./components/AuthorsList'))
const LazyCoverageMetricsList = lazy(() => import('./components/CoverageMetricsList'))

function App() {
  return (
    <BrowserRouter>
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
        <Resource
          name='authors'
          list={
            <DefaultLazy>
              <LazyAuthorsList />
            </DefaultLazy>
          }
        />
        <Resource
          name='coverageMetrics'
          list={
            <DefaultLazy>
              <LazyCoverageMetricsList />
            </DefaultLazy>
          }
        />
      </AdminSonarQube>
    </BrowserRouter>
  )
}

export default App
