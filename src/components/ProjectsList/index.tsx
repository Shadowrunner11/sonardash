import { Datagrid, List, TextField } from 'react-admin'

const propertiesProject = [
  { label: 'key', source: 'id' },
  { label: 'nombre', source: 'name' },
]

export function ProjectList() {
  return (
    <List>
      <Datagrid>
        {propertiesProject.map(({ label, source }) => (
          <TextField label={label} key={`column-${label}-${source}`} source={source} />
        ))}
      </Datagrid>
    </List>
  )
}
