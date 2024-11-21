import { Template, ValidationError } from '../../types/template';

export function validateWorkflow(template: Template): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Skip validation if no workflow defined
  if (!template.workflow) return errors;

  // Validate workflow steps
  Object.entries(template.workflow).forEach(([stepId, step]) => {
    // Validate required fields
    if (!step.name || !step.description) {
      errors.push({
        type: 'workflow',
        path: `workflow.${stepId}`,
        message: 'Workflow steps must have both name and description',
        severity: 'error'
      });
    }

    // Validate workflow type and dependencies
    if (step.explain && step.prompt) {
      errors.push({
        type: 'workflow',
        path: `workflow.${stepId}`,
        message: 'Workflow step cannot have both explain and prompt',
        severity: 'error'
      });
    }

    // Validate explanation-based workflows
    if (step.explain) {
      if (!step.requires?.length) {
        errors.push({
          type: 'workflow',
          path: `workflow.${stepId}`,
          message: 'Explanation-based workflows must have at least one dependency',
          severity: 'error'
        });
      }

      // Validate dependency types
      step.requires?.forEach(reqId => {
        if (!template.workflow?.[reqId]) {
          errors.push({
            type: 'dependency',
            path: `workflow.${stepId}.requires`,
            message: `Referenced workflow "${reqId}" does not exist`,
            severity: 'error'
          });
          return;
        }

        const requiredStep = template.workflow[reqId];
        if (requiredStep.explain) {
          errors.push({
            type: 'dependency',
            path: `workflow.${stepId}.requires`,
            message: 'Explanation-based workflows cannot depend on other explanation-based workflows',
            severity: 'error'
          });
        }
      });
    }

    // Validate data field references
    step.data?.forEach(dataId => {
      if (!template.data[dataId]) {
        errors.push({
          type: 'data',
          path: `workflow.${stepId}.data`,
          message: `Referenced data field "${dataId}" does not exist`,
          severity: 'error'
        });
      }
    });

    // Check for circular dependencies
    if (step.requires?.length) {
      const visited = new Set<string>();
      const checkCircular = (currentId: string): boolean => {
        if (visited.has(currentId)) return true;
        visited.add(currentId);
        
        const currentStep = template.workflow![currentId];
        return currentStep.requires?.some(reqId => checkCircular(reqId)) || false;
      };

      if (checkCircular(stepId)) {
        errors.push({
          type: 'dependency',
          path: `workflow.${stepId}`,
          message: 'Circular dependency detected in workflow',
          severity: 'error'
        });
      }
    }
  });

  return errors;
}