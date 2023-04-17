import { Box, Typography, type BoxProps } from '@mui/material'
import { Upload } from '@mui/icons-material'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

interface UploadFileProps {
  dropZoneOptions?: DropzoneOptions
}

export const UploadFile = ({ dropZoneOptions }: UploadFileProps) => {
  const { getRootProps, getInputProps } = useDropzone(dropZoneOptions)
  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      <Box
        sx={{
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        {...dropZoneProps}>
        <Upload />
        <Typography>{'Arrastar y soltar un archivo csv o hacer click para subir un archivo'}</Typography>
      </Box>
    </Box>
  )
}

const dropZoneProps: BoxProps = {
  borderRadius: 2,
  margin: 3,
  padding: 2,
  gap: 2,
  border: '1px dashed purple',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}
