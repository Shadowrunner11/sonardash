import { CustomRoutes, Resource } from 'react-admin'
import AdminSonarQube from './layout/AdminSonarQube'
import { lazy } from 'react'
import { DefaultLazy } from './components/DefaultLazy'
import { BrowserRouter, Route } from 'react-router-dom'
import BulkAuthors from './pages/BulkAuthors'

const LazyIssueList = lazy(() => import('./components/IssueList'))
const LazyProjectList = lazy(() => import('./components/ProjectsList'))
const LazyAuthorsList = lazy(() => import('./components/AuthorsList'))
const LazyCoverageMetricsList = lazy(() => import('./components/CoverageMetricsList'))
const LazyDuplicatedMetricsList = lazy(() => import('./components/DuplicatedMetricsList'))

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
        <Resource
          name='duplicatedMetrics'
          list={
            <DefaultLazy>
              <LazyDuplicatedMetricsList />
            </DefaultLazy>
          }
        />
        <CustomRoutes>
          <Route path='/bulkAuthors' element={<BulkAuthors />} />
        </CustomRoutes>
      </AdminSonarQube>
    </BrowserRouter>
  )
}

export default App
