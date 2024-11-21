import type { Meta, StoryObj } from '@storybook/react'

import { TemplateProvider } from '../../contexts/TemplateContext'
import WorkflowEditor from './index'

const meta: Meta<typeof WorkflowEditor> = {
  title: 'Components/WorkflowEditor',
  component: WorkflowEditor,
  decorators: [
    (Story) => (
      <TemplateProvider
        initialTemplate={{
          data: {
            customerName: {
              name: 'Customer Name',
              description: 'Full name of the customer',
              prompt: 'What is the customer\'s name?',
              type: 'string'
            },
            orderDetails: {
              name: 'Order Details',
              description: 'Details of the order',
              prompt: 'What did the customer order?',
              type: 'object'
            }
          },
          workflow: {
            initialContact: {
              name: 'Initial Contact',
              description: 'First contact with customer',
              prompt: 'How should we greet the customer?'
            },
            problemAnalysis: {
              name: 'Problem Analysis',
              description: 'Analyze customer issue',
              explain: 'Explain the customer\'s problem',
              requires: ['initialContact'],
              data: ['customerName']
            }
          }
        }}
      >
        <Story />
      </TemplateProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof WorkflowEditor>

export const Default: Story = {}

export const EmptyWorkflow: Story = {
  decorators: [
    (Story) => (
      <TemplateProvider
        initialTemplate={{
          data: {
            customerName: {
              name: 'Customer Name',
              description: 'Customer name field',
              prompt: 'Enter customer name',
              type: 'string'
            }
          },
          workflow: {}
        }}
      >
        <Story />
      </TemplateProvider>
    )
  ]
}

export const ComplexWorkflow: Story = {
  decorators: [
    (Story) => (
      <TemplateProvider
        initialTemplate={{
          data: {
            customerName: {
              name: 'Customer Name',
              description: 'Customer name field',
              prompt: 'Enter customer name',
              type: 'string'
            },
            orderDetails: {
              name: 'Order Details',
              description: 'Order details field',
              prompt: 'Enter order details',
              type: 'object'
            },
            feedback: {
              name: 'Feedback',
              description: 'Customer feedback',
              prompt: 'Enter customer feedback',
              type: 'string'
            }
          },
          workflow: {
            step1: {
              name: 'Initial Contact',
              description: 'First customer contact',
              prompt: 'Greet the customer',
              data: ['customerName']
            },
            step2: {
              name: 'Order Processing',
              description: 'Process the order',
              prompt: 'Handle order details',
              requires: ['step1'],
              data: ['orderDetails']
            },
            step3: {
              name: 'Feedback Collection',
              description: 'Collect customer feedback',
              explain: 'Explain how to collect feedback',
              requires: ['step2'],
              data: ['feedback']
            }
          }
        }}
      >
        <Story />
      </TemplateProvider>
    )
  ]
}
