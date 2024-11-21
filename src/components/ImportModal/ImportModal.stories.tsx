import type { Meta, StoryObj } from '@storybook/react'

import ImportModal from './index'
import { TemplateProvider } from '../../contexts/TemplateContext'

const meta: Meta<typeof ImportModal> = {
  title: 'Components/ImportModal',
  component: ImportModal,
  decorators: [
    (Story) => (
      <TemplateProvider>
        <Story />
      </TemplateProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ImportModal>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Modal closed'),
  },
}
