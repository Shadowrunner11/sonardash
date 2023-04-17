import { memo } from 'react'

import { TableContainer, Table, TableHead, TableBody } from '@mui/material'

interface GenericTableProps {
  head: JSX.Element
  body: JSX.Element
}

export default memo(function GenericTable({ head, body }: GenericTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>{head}</TableHead>
        <TableBody>{body}</TableBody>
      </Table>
    </TableContainer>
  )
})
