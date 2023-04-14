import { Datagrid, List, TextField } from 'react-admin'

const propertiesProject = [
  { label: 'key', source: 'id' },
  { label: 'nombre', source: 'name' },
  { label: 'cualificador', source: 'qualifier' },
  { label: 'visibilidad', source: 'visibility' },
]

export default function ProjectList() {
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
