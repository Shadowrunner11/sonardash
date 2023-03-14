import { QueryClient } from 'react-query'
import { Admin } from 'react-admin'
import type { AdminProps } from 'react-admin'
import { memo } from 'react'
import WithThemeChange from './WithThemeChange'
import { ReactQueryClient } from '../lib/service/FetchClient/ReactQueryClient'
import { authProvider, dataProvider } from '../lib/providers'

// TODO: not catching data, maybe should use this client implementation instead of utils
const queryClient =
  dataProvider instanceof ReactQueryClient
    ? new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
        },
      },
    })
    : undefined

const AdminSonarQube = (props: Omit<AdminProps, 'dataProvider' | 'layout'>) => (
  <Admin
    authProvider={authProvider}
    queryClient={queryClient}
    dataProvider={dataProvider}
    layout={WithThemeChange}
    {...props}>
    {props.children}
  </Admin>
)

export default memo(AdminSonarQube)
