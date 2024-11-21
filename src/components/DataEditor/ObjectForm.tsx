import { AttributeValue, DataField } from '../../types/template'
import { useEffect, useState } from 'react'

interface ObjectFormProps {
  field: DataField
  id: string
  updateData: (id: string, field: DataField) => void
}

export default function ObjectForm({ field, id, updateData }: ObjectFormProps) {
  const [localAttributes, setLocalAttributes] = useState<Record<string, AttributeValue>>(field.attributes || {})

  useEffect(() => {
    setLocalAttributes(field.attributes || {})
  }, [field.attributes])

  const handleKeyChange = (oldKey: string, newKey: string, value: AttributeValue) => {
    const { [oldKey]: _, ...rest } = localAttributes
    const updatedAttributes = { ...rest, [newKey]: value }
    setLocalAttributes(updatedAttributes)
  }

  const handlePromptChange = (key: string, value: string) => {
    if (Array.isArray(localAttributes[key])) {
      if (typeof localAttributes[key][0] === 'string') {
        setLocalAttributes({ ...localAttributes, [key]: [value] })
      } else {
        setLocalAttributes({ ...localAttributes, [key]: [{ ...localAttributes[key][0], value }] })
      }
    } else {
      setLocalAttributes({ ...localAttributes, [key]: value })
    }
  }

  const renderValueInput = (key: string, value: AttributeValue) => {
    const isArray = Array.isArray(value);
    return (
      <div className="flex flex-1 gap-2">
        <select 
          value={isArray ? 'list' : 'string'}
          onChange={(e) => {
            const newType = e.target.value;
            if (newType === 'list') {
              setLocalAttributes({ 
                ...localAttributes, 
                [key]: typeof value === 'string' ? [value] : [''] 
              });
            } else {
              setLocalAttributes({ 
                ...localAttributes, 
                [key]: (Array.isArray(value) ? value[0] || '' : value) as AttributeValue
              });
            }
          }}
          className="border rounded p-1"
        >
          <option value="string">String</option>
          <option value="list">List</option>
        </select>
        {isArray ? (
          <input
            type="text"
            value={typeof value[0] === 'object' ? (value[0] as any).value || '' : value[0] || ''}
            placeholder="Define what item should list have"
            onChange={(e) => handlePromptChange(key, e.target.value)}
            className="flex-1 border rounded p-1"
          />
        ) : (
          <input
            type="text"
            value={typeof value === 'object' ? '' : (value || '')}
            placeholder={`Define what value should this key have`}
            onChange={(e) => handlePromptChange(key, e.target.value)}
            className="flex-1 border rounded p-1"
          />
        )}
      </div>
    )
  }

  const handleSave = () => {
    if (JSON.stringify(localAttributes) !== JSON.stringify(field.attributes)) {
      updateData(id, {
        ...field,
        attributes: localAttributes
      })
    }
  }

  return (
    <div>
      <label className="block text-sm">Attributes:</label>
      <div className="space-y-2">
        {Object.entries(localAttributes).map(([key, value], i) => (
          <div key={`key-${i}`} className="flex gap-2">
            <input
              type="text"
              value={key}
              placeholder="Key"
              onChange={(e) => handleKeyChange(key, e.target.value, value)}
              className="flex-1 border rounded p-1"
            />
            {renderValueInput(key, value)}
          </div>
        ))}
        <div className="flex gap-2">
          <button
            onClick={() => {
              const newKey = `field${Object.keys(localAttributes).length + 1}`
              const newAttributes = { ...localAttributes, [newKey]: '' }
              setLocalAttributes(newAttributes)
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Attribute
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
} 