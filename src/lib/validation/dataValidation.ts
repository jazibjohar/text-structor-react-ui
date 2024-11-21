import { Template, ValidationError } from '../../types/template'

export function validateData(template: Template): ValidationError[] {
  const errors: ValidationError[] = []

  Object.entries(template.data).forEach(([id, field]) => {
    if (!field.prompt) {
      errors.push({
        type: 'data',
        path: `data.${id}`,
        message: 'Prompt is required',
        severity: 'error'
      })
    }

    if (field.type === 'object' && !field.attributes) {
      errors.push({
        type: 'data',
        path: `data.${id}`,
        message: 'Object type requires attributes',
        severity: 'error'
      })
    }
  })

  return errors
} 