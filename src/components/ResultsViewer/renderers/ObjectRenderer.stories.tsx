import type { Meta, StoryObj } from '@storybook/react'

import ObjectRenderer from './ObjectRenderer'

const meta: Meta<typeof ObjectRenderer> = {
  title: 'Components/ResultsViewer/Renderers/ObjectRenderer',
  component: ObjectRenderer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ObjectRenderer>

export const Simple: Story = {
  args: {
    title: 'User Information',
    data: {
      name: 'John Doe',
      age: 30,
      email: 'john@example.com'
    },
  }
}

export const NestedData: Story = {
  args: {
    title: 'Meeting Details',
    data: {
      participants: ['Alice', 'Bob'],
      duration: 60,
      metadata: {
        location: 'Room 101',
        type: 'Interview'
      }
    },
  }
}

export const Empty: Story = {
  args: {
    title: 'Empty Data',
    data: {},
  }
} 