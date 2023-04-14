import { Datagrid, List, TextField } from 'react-admin'

const propertiesCoverageMetrics = [
  { label: 'key', source: 'id' },
  { label: 'name', source: 'name' },
  { label: 'observacion', source: 'observation' },
  { label: 'Tipo Path Archivo', source: 'file' },
  { label: '% Cobertura', source: 'totalCoveragePercent' },
  { label: 'Lineas por Cubrir', source: 'linesToCover' },
  { label: 'Lineas sin Cobertura', source: 'linesNoCoverage' },
  { label: '% Cobertura de Lineas', source: 'linesCoveragePercent' },
  { label: 'Condiciones por Cubrir', source: 'qtyConditionsToCover' },
  { label: 'Condiciones sin Cobertura', source: 'qtyConditionsWithoutCover' },
  { label: '% Cobertura de Condiciones', source: 'conditionsCoveragePercentage' },
  { label: 'Dia de Muestra', source: 'date' },
  { label: 'Hora de Muestra', source: 'hour' },
]

export default function CoverageMetricsList() {
  return (
    <List>
      <Datagrid>
        {propertiesCoverageMetrics.map(({ label, source }) => (
          <TextField label={label} key={`column-${label}-${source}`} source={source} />
        ))}
      </Datagrid>
    </List>
  )
}
