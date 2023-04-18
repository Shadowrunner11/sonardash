import { memo } from 'react'
import { Menu } from 'react-admin'

const commonResults = Object.freeze([ 'projects', 'issues', 'authors', 'coverageMetrics', 'duplicatedMetrics' ])

export default memo(function AsideMenu() {
  return (
    <Menu>
      {commonResults.map((commonResult) => (
        <Menu.ResourceItem key={commonResult} name={commonResult} />
      ))}
      <Menu.Item to='/bulkAuthors' primaryText='Subida de autores' />
    </Menu>
  )
})
