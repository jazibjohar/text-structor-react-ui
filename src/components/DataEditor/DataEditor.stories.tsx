import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import DataEditor from './index'
import { TemplateProvider } from '../../contexts/TemplateContext'

const meta: Meta<typeof DataEditor> = {
  title: 'Components/DataEditor',
  component: DataEditor,
  decorators: [
    (Story: StoryFn) => (
      <TemplateProvider>
        <Story />
      </TemplateProvider>
    )
  ],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof DataEditor>

// Empty state
export const Empty: Story = {}

// With pre-populated fields
export const WithFields: Story = {
  decorators: [
    ((Story: StoryFn) => (
      <TemplateProvider initialTemplate={{
        data: {
          'user-name': {
            name: 'User Name',
            type: 'string',
            prompt: 'Enter your full name',
            description: 'The full name of the user'
          },
          'age': {
            name: 'Age',
            type: 'numeric',
            prompt: 'Enter your age',
            description: 'User age in years'
          },
          'address': {
            name: 'Address',
            type: 'object',
            prompt: 'Enter your address details',
            description: 'User address information',
            attributes: {
              street: { 
                name: 'Street',
                type: 'string',
                prompt: 'Enter street address'
              },
              city: { 
                name: 'City',
                type: 'string',
                prompt: 'Enter city'
              },
              country: { 
                name: 'Country',
                type: 'string',
                prompt: 'Enter country'
              }
            }
          }
        },
      }}>
        <Story />
      </TemplateProvider>
    )) as any
  ]
}
