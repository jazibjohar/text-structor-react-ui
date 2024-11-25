import type { Meta, StoryObj } from '@storybook/react'

import type { Template } from '../../types/template'
import { TemplateProvider } from '../../contexts/TemplateContext'
import WorkflowGraph from './index'
import engineTemplate from './engine.json'

const meta: Meta<typeof WorkflowGraph> = {
  title: 'Components/WorkflowGraph',
  component: WorkflowGraph,
  decorators: [
    (Story, {parameters}) => (
      <TemplateProvider initialTemplate={parameters.template}>
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

export const Empty: Story = {
  args: {},
  parameters: {
    template: emptyTemplate
  }
}

export const ComplexWorkflow: Story = {
  args: {},
  parameters: {
    template: engineTemplate as Template
  }
}
