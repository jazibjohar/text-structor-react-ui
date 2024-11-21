import type { Meta, StoryObj } from '@storybook/react'

import { ValidationError } from '../../types/template'
import ValidationErrors from './index'

const meta: Meta<typeof ValidationErrors> = {
  title: 'Components/ValidationErrors',
  component: ValidationErrors,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ValidationErrors>

// Sample validation errors for stories
const sampleErrors: ValidationError[] = [
  {
    type: 'data',
    severity: 'error',
    path: '/data/field1',
    message: 'Required field is missing',
  },
  {
    type: 'workflow',
    severity: 'warning',
    path: '/data/field2',
    message: 'Value might be invalid',
  },
  {
    type: 'dependency',
    severity: 'error',
    path: '/data/field3',
    message: 'Invalid date format',
  },
]

export const NoErrors: Story = {
  args: {
    errors: [],
  },
}

export const SingleErrorType: Story = {
  args: {
    errors: [sampleErrors[0]],
  },
}

export const MultipleErrorTypes: Story = {
  args: {
    errors: sampleErrors,
  },
}

export const MixedSeverities: Story = {
  args: {
    errors: [sampleErrors[0], sampleErrors[1]],
  },
}
