import { DataField } from '../..//types/template'
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
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Data Fields</h2>
      
      {/* Existing Fields */}
      <div className="space-y-4 mb-6">
        {Object.entries(template.data).map(([id, field]) => (
          <div key={id} className="border rounded p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleField(id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expandedFields[id] ? '▼' : '▶'}
                </button>
                <span className="font-semibold">{field.name}</span>
              </div>
              <button
                onClick={() => deleteData(id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            {expandedFields[id] && (
              <div className="space-y-2">
                <div>
                  <label className="block text-sm">Name:</label>
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => updateData(id, { ...field, name: e.target.value })}
                    className="w-full border rounded p-1"
                  />
                </div>
                <div>
                  <label className="block text-sm">Description:</label>
                  <input
                    type="text"
                    value={field.description}
                    onChange={(e) => updateData(id, { ...field, description: e.target.value })}
                    className="w-full border rounded p-1"
                  />
                </div>
                <div>
                  <label className="block text-sm">Prompt:</label>
                  <input
                    type="text"
                    value={field.prompt}
                    onChange={(e) => updateData(id, { ...field, prompt: e.target.value })}
                    className="w-full border rounded p-1"
                  />
                </div>
                <div>
                  <label className="block text-sm">Type:</label>
                  <select
                    value={field.type}
                    onChange={(e) => updateData(id, { 
                      ...field, 
                      type: e.target.value as DataField['type'],
                      attributes: e.target.value === 'object' ? {} : undefined
                    })}
                    className="w-full border rounded p-1"
                  >
                    <option value="string">String</option>
                    <option value="numeric">Numeric</option>
                    <option value="list">List</option>
                    <option value="object">Object</option>
                  </select>
                </div>
                {field.type === 'object' && (
                  <ObjectForm
                    field={field}
                    id={id}
                    updateData={updateData}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Field Form */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Add New Field</h3>
        <div className="space-y-2">
          <input
            type="text"
            value={newFieldId}
            onChange={(e) => setNewFieldId(e.target.value)}
            placeholder="Field ID"
            className="w-full border rounded p-1"
          />
          <input
            type="text"
            value={newField.name}
            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
            placeholder="Name"
            className="w-full border rounded p-1"
          />
          <input
            type="text"
            value={newField.description}
            onChange={(e) => setNewField({ ...newField, description: e.target.value })}
            placeholder="Description"
            className="w-full border rounded p-1"
          />
          <input
            type="text"
            value={newField.prompt}
            onChange={(e) => setNewField({ ...newField, prompt: e.target.value })}
            placeholder="Prompt"
            className="w-full border rounded p-1"
          />
          <select
            value={newField.type}
            onChange={(e) => setNewField({ 
              ...newField, 
              type: e.target.value as DataField['type'] 
            })}
            className="w-full border rounded p-1"
          >
            <option value="string">String</option>
            <option value="numeric">Numeric</option>
            <option value="list">List</option>
            <option value="object">Object</option>
          </select>
          <button
            onClick={handleAdd}
            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  )
} 