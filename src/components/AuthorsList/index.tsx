import { memo } from 'react'
import { Datagrid, List, SearchInput, TextField } from 'react-admin'
import { AuthorGraphql } from '../../__generated__/graphql'

interface AuthorRa extends Omit<AuthorGraphql, '_id'> {
  id: string
}

interface AuthorRecords {
  label: string
  source?: keyof AuthorRa | string
}

const filters = [
  // eslint-disable-next-line react/jsx-key
  <SearchInput alwaysOn source='email' />,
]

const propertiesProject: AuthorRecords[] = [ { label: 'Correo', source: 'email' } ]

export default memo(function AuthorsList() {
  return (
    <List filters={filters}>
      <Datagrid>
        {propertiesProject.map(({ label, source }) => (
          <TextField label={label} key={`column-${label}-${source}`} source={String(source)} />
        ))}
      </Datagrid>
    </List>
  )
})
