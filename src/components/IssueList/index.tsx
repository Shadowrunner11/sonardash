import { Datagrid, List, TextField } from 'react-admin'
import { Filter } from './Filter'
import SideCard from '../../layout/SideCard'

const propertiesProject = [
  { label: 'Key', source: 'id' },
  { label: 'Proyecto', source: 'project' },
  { label: 'Autores', source: 'author' },
  { label: 'Observación', source: 'type' },
  { label: 'Severidad', source: 'severity' },
  { label: 'Regla', source: 'rule' },
  { label: 'Archivo', source: 'component' },
  { label: 'Línea de código', source: 'line' },
  { label: 'Día', source: 'date' },
  { label: 'Hora', source: 'time' },
  { label: 'Lenguaje', source: 'language' },
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
