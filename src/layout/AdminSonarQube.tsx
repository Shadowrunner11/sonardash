import { Admin, AdminProps } from 'react-admin'
import { dataProvider } from '../lib/data/sonarQube'
import { memo } from 'react'

const AdminSonarQube = (props: Omit<AdminProps, 'dataProvider'>) => (
  <Admin dataProvider={dataProvider} {...props}>
    {props.children}
  </Admin>
)

export default memo(AdminSonarQube)
