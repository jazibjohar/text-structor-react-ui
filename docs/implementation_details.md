# Next.js Application Component Design for AI Template Builder

## Project Structure Updates

```
admin-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── template/
│       └── page.tsx
├── components/
│   ├── template/
│   │   ├── TemplateBuilder/      # Main builder container
│   │   ├── DataEditor/           # Data definition editor
│   │   ├── WorkflowEditor/       # Workflow definition editor
│   │   ├── ValidationErrors/     # Error display component
│   │   ├── WorkflowGraph/        # Visual workflow representation
│   │   ├── MockOutput/          # Mock output preview
│   │   └── JsonPreview/         # JSON structure preview
│   └── ui/
├── lib/
│   ├── validation/
│   │   ├── dataValidation.ts    # Data structure validation
│   │   ├── workflowValidation.ts # Workflow validation
│   │   └── dependencyGraph.ts   # Workflow dependency analysis
│   └── mockGenerator/
│       └── outputSimulator.ts   # Mock output generation
├── types/
├── contexts/
└── styles/
```

## Core Data Types

```typescript:types/template.ts
export interface DataField {
  prompt: string;
  type: 'string' | 'numeric' | 'list' | 'object';
  attributes?: Record<string, string>; // For object type only
}

export interface WorkflowStep {
  name: string;
  prompt?: string;
  explain?: string;
  requires?: string[];
  data?: string[];
}

export interface Template {
  data: Record<string, DataField>;
  workflow?: Record<string, WorkflowStep>;
}

export interface ValidationError {
  type: 'data' | 'workflow' | 'dependency';
  path: string;
  message: string;
  severity: 'error' | 'warning';
}
```

## Main Components

### Template Builder
```typescript:components/template/TemplateBuilder/index.tsx
'use client';

export default function TemplateBuilder() {
  const { template, errors } = useTemplateContext();
  
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ValidationErrors errors={errors} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataEditor />
          <WorkflowEditor />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <WorkflowGraph />
            <MockOutput />
            <JsonPreview />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
```

### Validation Errors Display
```typescript:components/template/ValidationErrors/index.tsx
interface ValidationErrorsProps {
  errors: ValidationError[];
}

export default function ValidationErrors({ errors }: ValidationErrorsProps) {
  const errorsByType = groupBy(errors, 'type');
  
  return (
    <Box>
      {Object.entries(errorsByType).map(([type, typeErrors]) => (
        <Accordion key={type}>
          <AccordionSummary>
            {type} Errors ({typeErrors.length})
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {typeErrors.map((error, index) => (
                <ListItem key={index}>
                  <Alert 
                    severity={error.severity}
                    sx={{ width: '100%' }}
                  >
                    <AlertTitle>{error.path}</AlertTitle>
                    {error.message}
                  </Alert>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
```

### Workflow Graph
```typescript:components/template/WorkflowGraph/index.tsx
export default function WorkflowGraph() {
  const { template } = useTemplateContext();
  const { nodes, edges } = useWorkflowGraph(template.workflow);

  return (
    <Box sx={{ height: 400 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{
          workflow: WorkflowNode,
          parallel: ParallelWorkflowNode
        }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </Box>
  );
}
```

## Validation Logic

```typescript:lib/validation/workflowValidation.ts
export function validateWorkflow(template: Template): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!template.workflow) return errors;

  Object.entries(template.workflow).forEach(([id, step]) => {
    // Validate explanation-based workflows
    if (step.explain) {
      if (!step.requires?.length) {
        errors.push({
          type: 'workflow',
          path: `workflow.${id}`,
          message: 'Explanation-based workflows must have at least one dependency',
          severity: 'error'
        });
      }
    }

    // Validate data field references
    step.data?.forEach(dataId => {
      if (!template.data[dataId]) {
        errors.push({
          type: 'workflow',
          path: `workflow.${id}.data`,
          message: `Referenced data field "${dataId}" does not exist`,
          severity: 'error'
        });
      }
    });

    // Validate workflow dependencies
    step.requires?.forEach(reqId => {
      if (!template.workflow[reqId]) {
        errors.push({
          type: 'dependency',
          path: `workflow.${id}.requires`,
          message: `Referenced workflow "${reqId}" does not exist`,
          severity: 'error'
        });
      }
    });
  });

  return errors;
}
```

## Mock Output Generation

```typescript:lib/mockGenerator/outputSimulator.ts
export function generateMockOutput(template: Template): Record<string, any> {
  const mockData: Record<string, any> = {};

  Object.entries(template.data).forEach(([key, field]) => {
    switch (field.type) {
      case 'string':
        mockData[key] = 'Sample text';
        break;
      case 'numeric':
        mockData[key] = 42;
        break;
      case 'list':
        mockData[key] = ['Item 1', 'Item 2'];
        break;
      case 'object':
        mockData[key] = Object.keys(field.attributes || {}).reduce(
          (obj, attr) => ({ ...obj, [attr]: 'Sample value' }),
          {}
        );
        break;
    }
  });

  return mockData;
}
```

## Context Management

```typescript:contexts/TemplateContext.tsx
interface TemplateContextType {
  template: Template;
  errors: ValidationError[];
  updateData: (id: string, field: DataField) => void;
  updateWorkflow: (id: string, step: WorkflowStep) => void;
  deleteData: (id: string) => void;
  deleteWorkflow: (id: string) => void;
}

export const TemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [template, setTemplate] = useState<Template>({ data: {} });
  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    const newErrors = [
      ...validateData(template),
      ...validateWorkflow(template),
      ...validateDependencies(template)
    ];
    setErrors(newErrors);
  }, [template]);

  // Context implementation...
};
```

## Hooks

### Workflow Graph Hook
```typescript:lib/hooks/useWorkflowGraph.ts
import { useMemo } from 'react';
import { Node, Edge } from 'reactflow';
import { WorkflowStep } from '../types/template';

interface WorkflowGraphData {
  nodes: Node[];
  edges: Edge[];
}

export function useWorkflowGraph(workflow?: Record<string, WorkflowStep>): WorkflowGraphData {
  return useMemo(() => {
    if (!workflow) {
      return { nodes: [], edges: [] };
    }

    const nodes: Node[] = Object.entries(workflow).map(([id, step], index) => ({
      id,
      type: step.requires?.length ? 'workflow' : 'parallel',
      position: { x: 100, y: index * 100 }, // Basic vertical layout
      data: { label: step.name, step }
    }));

    const edges: Edge[] = Object.entries(workflow).flatMap(([id, step]) =>
      (step.requires || []).map((reqId) => ({
        id: `${reqId}-${id}`,
        source: reqId,
        target: id,
        type: 'smoothstep'
      }))
    );

    return { nodes, edges };
  }, [workflow]);
}
```

The `useWorkflowGraph` hook:
- Converts workflow steps into ReactFlow nodes and edges
- Differentiates between sequential and parallel workflow steps
- Generates a basic vertical layout for the graph
- Memoizes the result to prevent unnecessary recalculations
- Returns empty arrays when no workflow is defined

This updated design incorporates:
- Clear separation between data and workflow definitions
- Comprehensive validation system with UI feedback
- Visual workflow dependency graph
- Mock output generation for the last workflow step
- Support for parallel workflow execution when dependencies aren't specified
- Optional workflow configuration

The validation system provides immediate feedback for:
- Data field structure and type consistency
- Workflow dependency correctness
- Missing or invalid references
- Explanation-based workflow requirements

The workflow graph visualizes:
- Dependencies between workflow steps
- Parallel execution paths
- Sequential execution requirements
- Current workflow status