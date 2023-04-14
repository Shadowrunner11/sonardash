import { memo } from 'react'
import { Datagrid, List, TextField } from 'react-admin'
import { Author } from '../../__generated__/graphql'

interface AuthorRa extends Omit<Author, '_id'> {
  id: string
}

interface AuthorRecords {
  label: string
  source: keyof AuthorRa
}

const propertiesProject: AuthorRecords[] = [ { label: 'Correo', source: 'email' } ]

export default memo(function AuthorsList() {
  return (
    <List>
      <Datagrid>
        {propertiesProject.map(({ label, source }) => (
          <TextField label={label} key={`column-${label}-${source}`} source={source} />
        ))}
      </Datagrid>
    </List>
  )
})
