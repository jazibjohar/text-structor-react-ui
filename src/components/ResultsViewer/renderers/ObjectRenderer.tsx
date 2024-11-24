import {
  Box,
  Typography
} from '@mui/material'

import BaseTypeRenderer from './BaseTypeRenderer'
import ListRenderer from './ListRenderer'
import { groupDataByType } from '../../../helpers/helpers';

interface ObjectRendererProps {
  title: string
  data: Record<string, any>
}




export default function ObjectRenderer({ title, data }: ObjectRendererProps) {
  if (!data || Object.keys(data).length === 0) {
    return null
  }

  // Group data by types using the helper function
  const groupedData = groupDataByType(data);

  // Updated renderGroup function to match ValueRenderer logic
  const renderGroup = (groupData: Record<string, any>) => {
    if (Object.keys(groupData).length === 0) return null;

    return Object.entries(groupData).map(([key, value]) => {
      if (Array.isArray(value)) {
        return <ListRenderer key={key} title={key} data={value} />
      }

      if (typeof value === 'string' || typeof value === 'number') {
        return <BaseTypeRenderer key={key} label={key} value={value} />
      }

      return <BaseTypeRenderer key={key} label={key} value={String(value)} />
    });
  };

  return (
    <Box component="section" sx={{ mb: 2 }}>
      <Typography 
        component="h2" 
        variant="subtitle1" 
        color="primary.main"
        sx={{ 
          mb: 1,
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: '0.875rem',
          letterSpacing: '0.1em'
        }}
      >
        {title}
      </Typography>
      <Box sx={{ pl: 2 }}>
        {renderGroup(groupedData.primitives)}
        {renderGroup(groupedData.arrayStrings)}
        {renderGroup(groupedData.arrayObjects)}
        
      </Box>
    </Box>
  )
} 