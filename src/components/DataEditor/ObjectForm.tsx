import { AttributeValue, DataField } from '../../types/template'
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
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
      <Stack direction="row" spacing={2} flex={1}>
        <Select
          size="small"
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
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="string">String</MenuItem>
          <MenuItem value="list">List</MenuItem>
        </Select>
        <TextField
          size="small"
          fullWidth
          value={isArray 
            ? (typeof value[0] === 'object' ? (value[0] as any).value || '' : value[0] || '')
            : (typeof value === 'object' ? '' : (value || ''))}
          placeholder={isArray ? "Define what item should list have" : "Define what value should this key have"}
          onChange={(e) => handlePromptChange(key, e.target.value)}
        />
      </Stack>
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
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>Attributes:</Typography>
      <Stack spacing={2}>
        {Object.entries(localAttributes).map(([key, value], i) => (
          <Stack key={`key-${i}`} direction="row" spacing={2}>
            <TextField
              size="small"
              value={key}
              placeholder="Key"
              onChange={(e) => handleKeyChange(key, e.target.value, value)}
              sx={{ flex: 1 }}
            />
            {renderValueInput(key, value)}
          </Stack>
        ))}
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => {
              const newKey = `field${Object.keys(localAttributes).length + 1}`
              const newAttributes = { ...localAttributes, [newKey]: '' }
              setLocalAttributes(newAttributes)
            }}
            color="primary"
          >
            Add Attribute
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
} 