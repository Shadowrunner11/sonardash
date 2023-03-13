import { Datagrid, List, TextField } from 'react-admin'
import { Filter } from './Filter'

const propertiesProject = [
  { label: 'key', source: 'id' },
  { label: 'proyecto', source: 'project' },
]

export default function IssuesList() {
  return (
    <List aside={<Filter />}>
      <Datagrid>
        {propertiesProject.map(({ label, source }) => (
          <TextField label={label} key={`column-${label}-${source}`} source={source} />
        ))}
      </Datagrid>
    </List>
  )
}
