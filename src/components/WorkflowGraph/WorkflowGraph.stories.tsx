import type { Meta, StoryObj } from '@storybook/react'

import type { Template } from '../../types/template'
import { TemplateProvider } from '../../contexts/TemplateContext'
import WorkflowGraph from './index'

const meta: Meta<typeof WorkflowGraph> = {
  title: 'Components/WorkflowGraph',
  component: WorkflowGraph,
  decorators: [
    (Story) => (
      <TemplateProvider>
        <Story />
      </TemplateProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof WorkflowGraph>

const emptyTemplate: Template = {
  data: {},
  workflow: {}
}

const sampleTemplate: Template = {
  data: {
    field1: {
      name: 'Field 1',
      description: 'First field',
      prompt: 'Enter first value',
      type: 'string'
    },
    field2: {
      name: 'Field 2',
      description: 'Second field',
      prompt: 'Enter second value',
      type: 'numeric'
    },
    field3: {
      name: 'Field 3',
      description: 'Third field',
      prompt: 'Enter third value',
      type: 'list'
    }
  },
  workflow: {
    step1: {
      name: 'Initial Step',
      description: 'The first step in the workflow',
      prompt: 'Please complete step 1',
      explain: 'This step initializes the process',
      data: ['field1', 'field2'],
      requires: []
    },
    step2: {
      name: 'Processing Step',
      description: 'Intermediate processing',
      prompt: 'Complete processing step',
      data: ['field3'],
      requires: ['step1']
    },
    step3: {
      name: 'Final Step',
      description: 'Workflow completion',
      prompt: 'Complete final step',
      data: ['field1', 'field2', 'field3'],
      requires: ['step1', 'step2']
    }
  }
}

export const Empty: Story = {
  args: {},
  parameters: {
    template: emptyTemplate
  }
}

export const ComplexWorkflow: Story = {
  args: {},
  parameters: {
    template: sampleTemplate
  }
}
