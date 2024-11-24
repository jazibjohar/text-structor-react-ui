import {
  Box,
  Typography
} from '@mui/material'

import DataRenderer from '../DataRenderer'
import { groupDataByType } from '../../../helpers/helpers';

interface ObjectRendererProps {
  title: string
  data: Record<string, any>
  path: string
}

export default function ObjectRenderer({ title, data, path }: ObjectRendererProps) {
  if (!data || Object.keys(data).length === 0) {
    return null
  }

  // Group data by types using the helper function
  const groupedData = groupDataByType(data);

  // Helper function to render a group if it's not empty
  const renderGroup = (groupData: Record<string, any>) => {
    if (Object.keys(groupData).length === 0) return null;
    
    return (
      <DataRenderer 
        data={groupData} 
        titles={Object.keys(groupData).reduce((acc, key) => {
          acc[key] = key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')
          return acc
        }, {} as Record<string, string>)} 
        path={path} 
      />
    );
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
        {renderGroup(groupedData.objects)}
      </Box>
    </Box>
  )
} 