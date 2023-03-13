import { Datagrid, List, TextField } from 'react-admin'
import { Filter } from './Filter'

const propertiesProject = [
  { label: 'Key', source: 'id' },
  { label: 'Proyecto', source: 'project' },
  { label: 'Autores', source: 'author' },
  { label: 'Observación', source: 'type' },
  { label: 'Severidad', source: 'severity' },
  { label: 'Regla', source: 'rule' },
  { label: 'Archivo', source: 'component' },
  { label: 'Línea de código', source: 'line' },
  { label: 'Día', source: 'creationDate' },
  { label: 'Hora', source: '' },
  { label: 'Lenguaje', source: 'language' },
]

export function IssuesList() {
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
