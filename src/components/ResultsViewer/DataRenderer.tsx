import { Box } from '@mui/material'
import { ValueRenderer } from './renderers/ValueRenderer'
import { groupDataByType } from '../../helpers/helpers'

type DataType = Record<string, unknown>
type TitlesType = Record<string, string>

interface DataRendererProps {
  data: DataType
  titles: TitlesType
  path: string
}

const renderValues = (data: Record<string, unknown>, titles: TitlesType, path: string) => {
  return Object.entries(data).map(([key, value]) => (
    <ValueRenderer
      key={key}
      keyName={key}
      value={value}
      title={titles[key]}
      path={path}
    />
  ))
}

export default function DataRenderer({ data, titles, path }: DataRendererProps) {
  const groupedData = groupDataByType(data);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Render primitives first */}
      {Object.keys(groupedData.primitives).length > 0 && (
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          padding: 2,
          backgroundColor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1
        }}>
          {renderValues(groupedData.primitives, titles, path)}
        </Box>
      )}

      {/* Render string arrays second */}
      {renderValues(groupedData.arrayStrings, titles, path)}

      {/* Render object arrays third */}
      {renderValues(groupedData.arrayObjects, titles, path)}

      {/* Render objects last */}
      {renderValues(groupedData.objects, titles, path)}
    </Box>
  )
} 