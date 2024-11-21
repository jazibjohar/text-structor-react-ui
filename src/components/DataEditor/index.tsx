import { Box, Button, Collapse, IconButton, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { DataField } from '../..//types/template'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import  ObjectForm  from './ObjectForm'
import { useState } from 'react'
import { useTemplate } from '../../contexts/TemplateContext'

export default function DataEditor() {
  const { template, updateData, deleteData } = useTemplate()
  const [newFieldId, setNewFieldId] = useState('')
  const [newField, setNewField] = useState<DataField>({
    prompt: '',
    type: 'string',
    name: '',
    description: ''
  })
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({})

  const handleAdd = () => {
    if (!newFieldId || !newField.prompt) return
    updateData(newFieldId, newField)
    setNewFieldId('')
    setNewField({ 
      prompt: '', 
      type: 'string',
      name: '',
      description: ''
    })
  }

  const toggleField = (id: string) => {
    setExpandedFields(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>Data Fields</Typography>
      
      {/* Existing Fields */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {Object.entries(template.data).map(([id, field]) => (
          <Paper key={id} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => toggleField(id)}
                  sx={{ color: 'text.secondary' }}
                >
                  {expandedFields[id] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                </IconButton>
                <Typography fontWeight="medium">{field.name}</Typography>
              </Box>
              <IconButton
                color="error"
                onClick={() => deleteData(id)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Collapse in={expandedFields[id]}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  size="small"
                  label="Name"
                  value={field.name}
                  onChange={(e) => updateData(id, { ...field, name: e.target.value })}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Description"
                  value={field.description}
                  onChange={(e) => updateData(id, { ...field, description: e.target.value })}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Prompt"
                  value={field.prompt}
                  onChange={(e) => updateData(id, { ...field, prompt: e.target.value })}
                  fullWidth
                />
                <Select
                  size="small"
                  value={field.type}
                  onChange={(e) => updateData(id, { 
                    ...field, 
                    type: e.target.value as DataField['type'],
                    attributes: e.target.value === 'object' ? {} : undefined
                  })}
                  fullWidth
                >
                  <MenuItem value="string">String</MenuItem>
                  <MenuItem value="numeric">Numeric</MenuItem>
                  <MenuItem value="list">List</MenuItem>
                  <MenuItem value="object">Object</MenuItem>
                </Select>
                {field.type === 'object' && (
                  <ObjectForm
                    field={field}
                    id={id}
                    updateData={updateData}
                  />
                )}
              </Box>
            </Collapse>
          </Paper>
        ))}
      </Box>

      {/* New Field Form */}
      <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3 }}>
        <Typography variant="h6" fontWeight="medium" mb={2}>Add New Field</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            size="small"
            value={newFieldId}
            onChange={(e) => setNewFieldId(e.target.value)}
            placeholder="Field ID"
            fullWidth
          />
          <TextField
            size="small"
            value={newField.name}
            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
            placeholder="Name"
            fullWidth
          />
          <TextField
            size="small"
            value={newField.description}
            onChange={(e) => setNewField({ ...newField, description: e.target.value })}
            placeholder="Description"
            fullWidth
          />
          <TextField
            size="small"
            value={newField.prompt}
            onChange={(e) => setNewField({ ...newField, prompt: e.target.value })}
            placeholder="Prompt"
            fullWidth
          />
          <Select
            size="small"
            value={newField.type}
            onChange={(e) => setNewField({ 
              ...newField, 
              type: e.target.value as DataField['type'] 
            })}
            fullWidth
          >
            <MenuItem value="string">String</MenuItem>
            <MenuItem value="numeric">Numeric</MenuItem>
            <MenuItem value="list">List</MenuItem>
            <MenuItem value="object">Object</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={handleAdd}
            fullWidth
            sx={{ mt: 1 }}
          >
            Add Field
          </Button>
        </Box>
      </Box>
    </Paper>
  )
} 