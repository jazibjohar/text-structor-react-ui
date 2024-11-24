import {
  Box,
  IconButton,
  Paper,
  Typography
} from '@mui/material'

import AccountTreeIcon from '@mui/icons-material/AccountTree'
import DataRenderer from './DataRenderer'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {useState}from 'react'

interface WorkflowSectionProps {
  title: string
  data: any
  titles: any
  path: string
}

export default function WorkflowSection({ 
  title,
  data,
  titles,
  path,
}: WorkflowSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: isExpanded ? 2 : 0,
        pb: 1.5,
        borderBottom: isExpanded ? '1px solid' : 'none',
        borderColor: 'divider',
        cursor: 'pointer'
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      >
        <AccountTreeIcon 
          sx={{ 
            mr: 1,
            color: 'primary.main'
          }} 
        />
        <Typography 
          variant="h6" 
          fontWeight="500"
          sx={{
            color: 'primary.main',
            letterSpacing: '0.02em',
            flex: 1
          }}
        >
          {title}
        </Typography>
        <IconButton size="small">
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      
      {isExpanded && (
        <Box sx={{ pl: 2 }}>
          <DataRenderer data={data} titles={titles.data} path={path} />
        </Box>
      )}
    </Paper>
  )
} 