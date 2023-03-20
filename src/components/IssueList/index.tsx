import { Datagrid, List, TextField } from 'react-admin'
import Filter from './Filter'
import SideCard from '../../layout/SideCard'
import { memo } from 'react'

const propertiesProject = [
  { label: 'Key', source: 'sonarKey' },
  { label: 'Proyecto', source: 'project' },
  { label: 'Autores', source: 'developerEmail' },
  { label: 'Observación', source: 'observation' },
  { label: 'Severidad', source: 'severity' },
  { label: 'Regla', source: 'rule' },
  { label: 'Archivo', source: 'file' },
  { label: 'Línea de código', source: 'startLine' },
  { label: 'Fecha de creacion', source: 'issueCreatedAt' },
  { label: 'Lenguaje', source: 'language' },
]

const Filters = () => <SideCard content={<Filter />} />

export default memo(function IssuesList() {
  return (
    <List aside={<Filters />}>
      <Datagrid>
        {propertiesProject.map(({ label, source }) => (
          <TextField label={label} key={`column-${label}-${source}`} source={source} />
        ))}
      </Datagrid>
    </List>
  )
})
