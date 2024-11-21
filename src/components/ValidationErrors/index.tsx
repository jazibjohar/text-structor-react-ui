import { Box, List, ListItem, Paper, Typography } from '@mui/material'

import { ValidationError } from '../../types/template'

interface ValidationErrorsProps {
  errors: ValidationError[]
}

export default function ValidationErrors({ errors }: ValidationErrorsProps) {
  if (errors.length === 0) return null

  const errorsByType = errors.reduce((acc, error) => {
    acc[error.type] = acc[error.type] || []
    acc[error.type].push(error)
    return acc
  }, {} as Record<string, ValidationError[]>)

  return (
    <Box sx={{ '& > *:not(:last-child)': { mb: 2 } }}>
      {Object.entries(errorsByType).map(([type, typeErrors]) => (
        <Paper key={type} elevation={1} sx={{ p: 2, borderRadius: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {type} Errors ({typeErrors.length})
          </Typography>
          <List sx={{ '& > *:not(:last-child)': { mb: 1 } }}>
            {typeErrors.map((error, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'block',
                  bgcolor: error.severity === 'error' 
                    ? 'error.main' 
                    : error.severity === 'warning'
                    ? 'warning.main'
                    : 'info.main',
                  color: '#fff',
                  borderRadius: 1,
                  p: 1
                }}
              >
                <Typography variant="subtitle2" sx={{ color: 'inherit' }}>{error.path}</Typography>
                <Typography sx={{ color: 'inherit' }}>{error.message}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  )
} 