import { Datagrid, List, TextField } from 'react-admin'

const propertiesDuplicatedMetrics = [
  { label: 'key', source: 'id' },
  { label: 'name', source: 'name' },
  { label: 'observacion', source: 'observation' },
  { label: 'Tipo Path Archivo', source: 'file' },
  { label: '% Densidad', source: 'totalDensityPercent' },
  { label: 'Lineas Duplicadas', source: 'duplicatedLines' },
  { label: 'Bloques Duplicados', source: 'duplicatedBlocks' },
  { label: 'Archivos Duplicados', source: 'duplicatedFiles' },
  { label: 'Dia de Muestra', source: 'date' },
  { label: 'Hora de Muestra', source: 'hour' },
]

export default function CoverageMetricsList() {
  return (
    <List>
      <Datagrid>
        {propertiesDuplicatedMetrics.map(({ label, source }) => (
          <TextField label={label} key={`column-${label}-${source}`} source={source} />
        ))}
      </Datagrid>
    </List>
  )
}
