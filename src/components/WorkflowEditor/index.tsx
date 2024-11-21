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
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Workflow Steps</h2>
      
      {/* Existing Workflows */}
      <div className="space-y-4 mb-6">
        {Object.entries(template.workflow || {}).map(([id, workflow]) => {
          const workflowStep = workflow as WorkflowStep;
          return (
            <div key={id} className="border rounded p-3">
              <div className="flex justify-between items-start mb-2">
                <button 
                  onClick={() => toggleWorkflow(id)}
                  className="font-semibold flex items-center gap-2"
                >
                  <span>{expandedWorkflows[id] ? '▼' : '▶'}</span>
                  <span>{workflowStep.name}</span>
                </button>
                <button
                  onClick={() => deleteWorkflow(id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              {expandedWorkflows[id] && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm">Name:</label>
                    <input
                      type="text"
                      value={workflowStep.name}
                      onChange={(e) => updateWorkflow(id, { ...workflowStep, name: e.target.value })}
                      className="w-full border rounded p-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Description:</label>
                    <input
                      type="text"
                      value={workflowStep.description}
                      onChange={(e) => updateWorkflow(id, { ...workflowStep, description: e.target.value })}
                      className="w-full border rounded p-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Type:</label>
                    <select
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
                      className="w-full border rounded p-1"
                    >
                      <option value="prompt">Prompt</option>
                      <option value="explain">Explain</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm">
                      {workflowStep.explain ? 'Explanation' : 'Prompt'}:
                    </label>
                    <textarea
                      value={workflowStep.explain || workflowStep.prompt || ''}
                      onChange={(e) => {
                        if (workflowStep.explain) {
                          updateWorkflow(id, { ...workflowStep, explain: e.target.value })
                        } else {
                          updateWorkflow(id, { ...workflowStep, prompt: e.target.value })
                        }
                      }}
                      className="w-full border rounded p-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Required Steps:</label>
                    <select
                      multiple
                      value={workflowStep.requires || []}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions).map(option => option.value)
                        updateWorkflow(id, { ...workflowStep, requires: selected })
                      }}
                      className="w-full border rounded p-1"
                    >
                      {Object.keys(template.workflow || {})
                        .filter(wId => {
                          // Don't show current workflow
                          if (wId === id) return false
                          
                          // If current workflow is explanation-based,
                          // filter out other explanation-based workflows
                          if (workflowStep.explain && template.workflow![wId].explain) {
                            return false
                          }

                          return true
                        })
                        .map(wId => (
                          <option key={wId} value={wId}>
                            {`${wId} (${template.workflow![wId].name})`}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm">Data Fields:</label>
                    <select
                      multiple
                      value={workflowStep.data || []}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions).map(option => option.value)
                        updateWorkflow(id, { ...workflowStep, data: selected })
                      }}
                      className="w-full border rounded p-1"
                    >
                      {Object.keys(template.data).map(dataId => (
                        <option key={dataId} value={dataId}>{`${dataId} (${template.data[dataId].name})`}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* New Workflow Form */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Add New Workflow</h3>
        <div className="space-y-2">
          <input
            type="text"
            value={newWorkflowId}
            onChange={(e) => setNewWorkflowId(e.target.value)}
            placeholder="Workflow ID"
            className="w-full border rounded p-1"
          />
          <input
            type="text"
            value={newWorkflow.name}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
            placeholder="Name"
            className="w-full border rounded p-1"
          />
          <input
            type="text"
            value={newWorkflow.description}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
            placeholder="Description"
            className="w-full border rounded p-1"
          />
          <input
            type="text"
            value={newWorkflow.prompt || ''}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, prompt: e.target.value })}
            placeholder="Prompt/Explanation"
            className="w-full border rounded p-1"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Add Workflow
          </button>
        </div>
      </div>
    </div>
  )
} 