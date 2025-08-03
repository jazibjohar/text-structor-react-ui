# text-structor-react-ui

A React component library for building AI-powered template editors and workflow managers. This library provides a visual interface for creating JSON templates compatible with [ai-text-structor](https://github.com/jazibjohar/ai-text-structor) - a powerful asynchronous framework for orchestrating Large Language Model (LLM) workflows.

The generated templates can be used directly with ai-text-structor to:
- Define structured data collection fields
- Create complex workflow steps
- Configure LLM prompts and explanations
- Manage dependencies between steps

## Installation

```bash
npm install text-structor-react-ui
```

## Core Components

### TemplateProvider

The context provider that manages template state:

```tsx
import { TemplateProvider } from 'text-structor-react-ui'

function App() {
  return (
    <TemplateProvider 
      initialTemplate={{
        data: {},
        workflow: {}
      }}
    >
      <YourComponents />
    </TemplateProvider>
  )
}
```

### DataEditor

Component for managing data fields:

```tsx
import { DataEditor } from 'text-structor-react-ui'

function TemplateSection() {
  return (
    <div>
      <h1>Template Editor</h1>
      <DataEditor />
    </div>
  )
}
```

Supports field types:
- String
- Numeric 
- List
- Object (with nested attributes)

### WorkflowEditor

Editor for creating workflow steps:

```tsx
import { WorkflowEditor } from 'text-structor-react-ui'

function WorkflowSection() {
  return (
    <div>
      <h1>Workflow Steps</h1>
      <WorkflowEditor />
    </div>
  )
}
```

Features:
- Step dependencies
- Data field associations
- Prompt/Explanation modes
- Validation

### WorkflowGraph

Visual graph representation of workflow steps:

```tsx
import { WorkflowGraph } from 'text-structor-react-ui'

function GraphSection() {
  return (
    <div>
      <h1>Workflow Visualization</h1>
      <WorkflowGraph />
    </div>
  )
}
```

Features:
- Interactive node graph
- Dependency visualization
- Automatic layout
- Pan and zoom controls

### JsonPreview

JSON visualization component:

```tsx
import { JsonPreview } from 'text-structor-react-ui'

function PreviewSection() {
  return (
    <div>
      <h1>Template Preview</h1>
      <JsonPreview />
    </div>
  )
}
```

Features:
- Pretty-printed JSON
- Copy to clipboard
- Download as file

### Complete Example

```tsx
import { 
  TemplateProvider,
  TemplateBuilder
} from 'text-structor-react-ui'

function App() {
  return (
    <TemplateProvider>
      <div className="container mx-auto p-4">
        <h1>AI Template Builder</h1>
        <TemplateBuilder />
      </div>
    </TemplateProvider>
  )
}
```

## Template Structure

### Data Fields
```typescript
{
  data: {
    [fieldId: string]: {
      name: string
      description: string
      prompt: string
      type: 'string' | 'numeric' | 'list' | 'object'
      attributes?: Record<string, any>
    }
  }
}
```

### Workflow Steps
```typescript
{
  workflow: {
    [stepId: string]: {
      name: string
      description: string
      prompt?: string
      explain?: string
      requires?: string[]
      data?: string[]
    }
  }
}
```

## Validation

Built-in validation includes:
- Data field integrity
- Workflow dependencies
- Circular dependency detection
- Required field validation

Error types:
- `data`: Data field validation errors
- `workflow`: Workflow step validation errors  
- `dependency`: Dependency graph validation errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.