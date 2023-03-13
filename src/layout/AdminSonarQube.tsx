import { Admin, AdminProps } from 'react-admin'
import { dataProvider } from '../lib/data/sonarQube'
import { memo } from 'react'
import WithThemeChange from './WithThemeChange'

const AdminSonarQube = (props: Omit<AdminProps, 'dataProvider' | 'layout'>) => (
  <Admin dataProvider={dataProvider} layout={WithThemeChange} {...props}>
    {props.children}
  </Admin>
)

export default memo(AdminSonarQube)
