import { Datagrid, List, TextField } from 'react-admin'
import { Filter } from './Filter'
import SideCard from '../../layout/SideCard'

const propertiesProject = [
  { label: 'key', source: 'id' },
  { label: 'proyecto', source: 'project' },
]

const Filters = () => <SideCard content={<Filter />} />

export default function IssuesList() {
  return (
    <List aside={<Filters />}>
      <Datagrid>
        {propertiesProject.map(({ label, source }) => (
          <TextField label={label} key={`column-${label}-${source}`} source={source} />
        ))}
      </Datagrid>
    </List>
  )
}
