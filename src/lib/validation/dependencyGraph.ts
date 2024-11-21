import { Template, ValidationError } from '../../types/template'

export function validateDependencies(template: Template): ValidationError[] {
  const errors: ValidationError[] = []

  if (!template.workflow) return errors

  // Check for circular dependencies
  const visited = new Set<string>()
  const recursionStack = new Set<string>()

  function detectCycle(workflowId: string): boolean {
    if (recursionStack.has(workflowId)) return true
    if (visited.has(workflowId)) return false

    visited.add(workflowId)
    recursionStack.add(workflowId)

    const step = template.workflow![workflowId]
    for (const reqId of step.requires || []) {
      if (detectCycle(reqId)) return true
    }

    recursionStack.delete(workflowId)
    return false
  }

  Object.keys(template.workflow).forEach(workflowId => {
    if (detectCycle(workflowId)) {
      errors.push({
        type: 'dependency',
        path: `workflow.${workflowId}`,
        message: 'Circular dependency detected',
        severity: 'error'
      })
    }
  })

  return errors
} 