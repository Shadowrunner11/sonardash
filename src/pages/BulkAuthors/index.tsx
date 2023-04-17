import { memo, useCallback } from 'react'
import {
  Typography,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Button,
  Stack,
  Box,
  CircularProgress,
} from '@mui/material'

import { Download } from '@mui/icons-material'

import papa from 'papaparse'
import { UploadFile } from '../../components/UploadFile'
import GenericTable from '../../layout/GenericTable'
import { useUpsertAuthorsFromCsv } from './hooks'

import { blobURL_CSV, columnIds, homologusData } from './config'

export default memo(function BulkAuthors() {
  const [
    _handleClickSend,
    setParsedCSV,
    {
      parsedCSV,
      currentSelectFields,
      updateData: { data, loading },
    },
  ] = useUpsertAuthorsFromCsv()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [ acceptedFile ] = acceptedFiles

    papa.parse<Record<string, string>>(acceptedFile, {
      header: true,
      complete(results) {
        setParsedCSV(results)
      },
    })
  }, [])

  return (
    <Stack spacing={2}>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Button href={blobURL_CSV} download='developersDataExample' endIcon={<Download />}>
          Puedes descargar un archivo de ejemplo
        </Button>
      </Box>
      <UploadFile dropZoneOptions={{ onDrop, maxFiles: 1 }} />
      {loading && <CircularProgress />}
      {data?.length && !parsedCSV && (
        <Typography>
          Se actualizaron/insertaron {data?.length} registro{data?.length > 1 ? 's' : ''}
        </Typography>
      )}
      {parsedCSV?.meta.fields && (
        <>
          <Typography variant='h4' component='h2'>
            Homologacion de columnas
          </Typography>
          <GenericTable
            head={
              <TableRow>
                {parsedCSV?.meta.fields?.map((field) => (
                  <TableCell key={`head-${field}`}>{field}</TableCell>
                ))}
              </TableRow>
            }
            body={
              <TableRow>
                {parsedCSV?.meta.fields?.map((field, index) => (
                  <TableCell key={`body-${field}`}>
                    <Select
                      defaultValue={columnIds[index]}
                      displayEmpty
                      inputRef={(ref) => (currentSelectFields[field] = ref?.node?.value)}>
                      {columnIds.map((key) => (
                        <MenuItem key={key} value={key}>
                          {homologusData[key as keyof typeof homologusData]}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                ))}
              </TableRow>
            }
          />
          <Button
            sx={{
              maxWidth: 100,
              marginX: 'auto !important',
            }}
            variant='contained'
            onClick={_handleClickSend}>
            Enviar
          </Button>
        </>
      )}
    </Stack>
  )
})
