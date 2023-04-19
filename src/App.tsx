import { CustomRoutes, Resource } from 'react-admin'
import AdminSonarQube from './layout/AdminSonarQube'
import { lazy } from 'react'
import { DefaultLazy } from './components/DefaultLazy'
import { BrowserRouter, Route } from 'react-router-dom'
import BulkAuthors from './pages/BulkAuthors'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SourceIcon from '@mui/icons-material/Source'
import CodeIcon from '@mui/icons-material/Code'

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
          icon={ErrorOutlineIcon}
          name='issues'
          list={
            <DefaultLazy>
              <LazyIssueList />
            </DefaultLazy>
          }
        />
        <Resource
          icon={SourceIcon}
          name='projects'
          list={
            <DefaultLazy>
              <LazyProjectList />
            </DefaultLazy>
          }
        />
        <Resource
          icon={AccountCircleIcon}
          name='authors'
          list={
            <DefaultLazy>
              <LazyAuthorsList />
            </DefaultLazy>
          }
        />
        <Resource
          icon={CodeIcon}
          name='coverageMetrics'
          list={
            <DefaultLazy>
              <LazyCoverageMetricsList />
            </DefaultLazy>
          }
        />
        <Resource
          icon={ContentCopyIcon}
          name='duplicatedMetrics'
          list={
            <DefaultLazy>
              <LazyDuplicatedMetricsList />
            </DefaultLazy>
          }
        />
        <CustomRoutes>
          <Route path='/sincro' element={<BulkAuthors />} />
        </CustomRoutes>
      </AdminSonarQube>
    </BrowserRouter>
  )
}

export default App
