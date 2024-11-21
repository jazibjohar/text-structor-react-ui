import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material'
import { useRef, useState } from 'react'

import { useTemplate } from '../../contexts/TemplateContext'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ImportModal({ isOpen, onClose }: ImportModalProps) {
  const [jsonText, setJsonText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { updateTemplate } = useTemplate()

  const handleImport = () => {
    try {
      const templateData = JSON.parse(jsonText)
      updateTemplate(templateData)
      onClose()
    } catch (error) {
      alert('Invalid JSON format')
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setJsonText(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>Import Template JSON</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <TextField
            multiline
            rows={8}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            fullWidth
            placeholder="Paste your JSON here..."
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload File
            </Button>
            <Button
              variant="contained"
              onClick={handleImport}
              color="primary"
            >
              Import
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  )
} 