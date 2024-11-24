import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'

interface StringListRendererProps {
  title: string
  data: string[]
  id?: string
}

export default function StringListRenderer({ title, data, id = crypto.randomUUID() }: StringListRendererProps) {
  if (!data?.length) {
    return null
  }

  const titleId = `${id}-title`

  return (
    <Box 
      component="section" 
      sx={{ mb: 2 }}
    >
      <Typography 
        id={titleId}
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
      <List 
        dense
        aria-labelledby={titleId}
        sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
          '& .MuiListItem-root': {
            px: 1,
            py: 0.5,
            borderBottom: 'none'
          }
        }}
      >
        {data.map((item) => (
          <ListItem 
            key={`${id}-item-${item}`}
            disablePadding
          >
            <ListItemText 
              primary={item}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.9rem',
                  display: 'list-item',
                  listStyleType: 'disc',
                  listStylePosition: 'inside',
                  ml: 1
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
} 