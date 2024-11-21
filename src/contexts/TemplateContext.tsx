import { DataField, Template, ValidationError, WorkflowStep } from '../types/template'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { validateData } from '..//lib/validation/dataValidation'
import { validateDependencies } from '../lib/validation/dependencyGraph'
import { validateWorkflow } from '../lib/validation/workflowValidation'

interface TemplateContextType {
  template: Template;
  errors: ValidationError[];
  updateData: (id: string, field: DataField) => void;
  updateWorkflow: (id: string, step: WorkflowStep) => void;
  deleteData: (id: string) => void;
  deleteWorkflow: (id: string) => void;
  updateTemplate: (template: any) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined)

export function TemplateProvider({ 
  children, 
  initialTemplate = { data: {}, workflow: {} }
}: { 
  children: React.ReactNode;
  initialTemplate?: Template;
}) {
  const [template, setTemplate] = useState<Template>(initialTemplate)
  const [errors, setErrors] = useState<ValidationError[]>([])

  useEffect(() => {
    const newErrors = [
      ...validateData(template),
      ...validateWorkflow(template),
      ...validateDependencies(template)
    ]
    setErrors(newErrors)
  }, [template])

  const updateData = (id: string, field: DataField) => {
    setTemplate(prev => ({
      ...prev,
      data: { ...prev.data, [id]: field }
    }))
  }

  const updateWorkflow = (id: string, step: WorkflowStep) => {
    setTemplate(prev => ({
      ...prev,
      workflow: { ...(prev.workflow || {}), [id]: step }
    }))
  }

  const deleteData = (id: string) => {
    setTemplate(prev => {
      const { [id]: _, ...remainingData } = prev.data // eslint-disable-line @typescript-eslint/no-unused-vars
      return { ...prev, data: remainingData }
    })
  }

  const deleteWorkflow = (id: string) => {
    setTemplate(prev => {
      if (!prev.workflow) return prev
      const { [id]: _, ...remainingWorkflow } = prev.workflow // eslint-disable-line @typescript-eslint/no-unused-vars
      return { ...prev, workflow: remainingWorkflow }
    })
  }

  return (
    <TemplateContext.Provider value={{
      template,
      errors,
      updateData,
      updateWorkflow,
      deleteData,
      deleteWorkflow,
      updateTemplate: (template: any) => {
        setTemplate(template)
      }
    }}>
      {children}
    </TemplateContext.Provider>
  )
}

export function useTemplate() {
  const context = useContext(TemplateContext)
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider')
  }
  return context
} 