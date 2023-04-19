import { memo } from 'react'
import { Menu } from 'react-admin'
import CloudSyncIcon from '@mui/icons-material/CloudSync'

const commonResults = Object.freeze([ 'projects', 'issues', 'authors', 'coverageMetrics', 'duplicatedMetrics' ])

export default memo(function AsideMenu() {
  return (
    <Menu>
      {commonResults.map((commonResult) => (
        <Menu.ResourceItem key={commonResult} name={commonResult} />
      ))}
      <Menu.Item to='/sincro' primaryText='Sincronización' leftIcon={<CloudSyncIcon />} />
    </Menu>
  )
})
