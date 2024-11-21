import { Box, IconButton, Paper, Stack, Typography } from '@mui/material'
import { ContentCopy, Download } from '@mui/icons-material'

import { styled } from '@mui/material/styles'
import { useTemplate } from '../../contexts/TemplateContext'

const PreWrapper = styled('pre')({
  backgroundColor: '#f5f5f5',
  padding: '16px',
  borderRadius: '4px',
  overflow: 'auto',
  maxHeight: '384px', // equivalent to max-h-96
  margin: 0,
  fontSize: '0.875rem'
})

export default function JsonPreview() {
  const { template } = useTemplate()

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(template, null, 2))
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-engine.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        position: 'relative'
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        JSON Preview
      </Typography>
      
      <PreWrapper>
        {JSON.stringify(template, null, 2)}
      </PreWrapper>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: 24,
          right: 24
        }}
      >
        <IconButton
          onClick={handleDownload}
          size="small"
          sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          title="Download JSON"
        >
          <Download fontSize="small" />
        </IconButton>
        
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          title="Copy to clipboard"
        >
          <ContentCopy fontSize="small" />
        </IconButton>
      </Stack>
    </Paper>
  )
} 