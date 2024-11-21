import {
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { WorkflowStep } from '../../types/template'
import { useState } from 'react'
import { useTemplate } from '../../contexts/TemplateContext'

export default function WorkflowEditor() {
  const { template, updateWorkflow, deleteWorkflow } = useTemplate()
  const [newWorkflowId, setNewWorkflowId] = useState('')
  const [newWorkflow, setNewWorkflow] = useState<WorkflowStep>({
    name: '',
    prompt: '',
    description: ''
  })
  const [expandedWorkflows, setExpandedWorkflows] = useState<Record<string, boolean>>({})

  const handleAdd = () => {
    if (!newWorkflowId || !newWorkflow.name) return
    updateWorkflow(newWorkflowId, newWorkflow)
    setNewWorkflowId('')
    setNewWorkflow({ name: '', prompt: '', description: '' })
  }

  const toggleWorkflow = (id: string) => {
    setExpandedWorkflows(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Workflow Steps
      </Typography>
      
      {/* Existing Workflows */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Object.entries(template.workflow || {}).map(([id, workflow]) => {
          const workflowStep = workflow as WorkflowStep;
          return (
            <Paper key={id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Button
                  onClick={() => toggleWorkflow(id)}
                  startIcon={expandedWorkflows[id] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  {workflowStep.name}
                </Button>
                <IconButton
                  onClick={() => deleteWorkflow(id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              
              <Collapse in={expandedWorkflows[id]}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Name"
                    size="small"
                    fullWidth
                    value={workflowStep.name}
                    onChange={(e) => updateWorkflow(id, { ...workflowStep, name: e.target.value })}
                  />
                  
                  <TextField
                    label="Description"
                    size="small"
                    fullWidth
                    value={workflowStep.description}
                    onChange={(e) => updateWorkflow(id, { ...workflowStep, description: e.target.value })}
                  />
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={workflowStep.explain ? 'explain' : 'prompt'}
                      onChange={(e) => {
                        const type = e.target.value
                        if (type === 'explain') {
                          updateWorkflow(id, {
                            ...workflowStep,
                            prompt: undefined,
                            explain: workflowStep.prompt || ''
                          })
                        } else {
                          updateWorkflow(id, {
                            ...workflowStep,
                            explain: undefined,
                            prompt: workflowStep.explain || ''
                          })
                        }
                      }}
                      label="Type"
                    >
                      <MenuItem value="prompt">Prompt</MenuItem>
                      <MenuItem value="explain">Explain</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <TextField
                    label={workflowStep.explain ? 'Explanation' : 'Prompt'}
                    multiline
                    rows={3}
                    fullWidth
                    value={workflowStep.explain || workflowStep.prompt || ''}
                    onChange={(e) => {
                      if (workflowStep.explain) {
                        updateWorkflow(id, { ...workflowStep, explain: e.target.value })
                      } else {
                        updateWorkflow(id, { ...workflowStep, prompt: e.target.value })
                      }
                    }}
                  />
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Required Steps</InputLabel>
                    <Select
                      multiple
                      value={workflowStep.requires || []}
                      onChange={(e: SelectChangeEvent<string[]>) => {
                        const selected = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
                        updateWorkflow(id, { ...workflowStep, requires: selected })
                      }}
                      input={<OutlinedInput label="Required Steps" />}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {Object.keys(template.workflow || {})
                        .filter(wId => {
                          if (wId === id) return false
                          if (workflowStep.explain && template.workflow![wId].explain) return false
                          return true
                        })
                        .map(wId => (
                          <MenuItem key={wId} value={wId}>
                            <ListItemText primary={`${wId} (${template.workflow![wId].name})`} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Data Fields</InputLabel>
                    <Select
                      multiple
                      value={workflowStep.data || []}
                      onChange={(e: SelectChangeEvent<string[]>) => {
                        const selected = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
                        updateWorkflow(id, { ...workflowStep, data: selected })
                      }}
                      input={<OutlinedInput label="Data Fields" />}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {Object.keys(template.data).map(dataId => (
                        <MenuItem key={dataId} value={dataId}>
                          <ListItemText primary={`${dataId} (${template.data[dataId].name})`} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Collapse>
            </Paper>
          )
        })}
      </Box>

      {/* New Workflow Form */}
      <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Workflow
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            value={newWorkflowId}
            onChange={(e) => setNewWorkflowId(e.target.value)}
            placeholder="Workflow ID"
          />
          <TextField
            fullWidth
            size="small"
            value={newWorkflow.name}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
            placeholder="Name"
          />
          <TextField
            fullWidth
            size="small"
            value={newWorkflow.description}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
            placeholder="Description"
          />
          <TextField
            fullWidth
            size="small"
            value={newWorkflow.prompt || ''}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, prompt: e.target.value })}
            placeholder="Prompt/Explanation"
          />
          <Button
            variant="contained"
            onClick={handleAdd}
            fullWidth
            sx={{ mt: 1 }}
          >
            Add Workflow
          </Button>
        </Box>
      </Box>
    </Paper>
  )
} 