import type { Meta, StoryObj } from '@storybook/react'

import ResultsViewer from './index'
import engineResponse from './engine_response.json'

const meta: Meta<typeof ResultsViewer> = {
  title: 'Components/ResultsViewer',
  component: ResultsViewer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ResultsViewer>

const mockSimpleData = {
  results: {
    main: {
      participants: ['John', 'Jane'],
      duration: 30.0,
      status: 'completed'
    }
  },
  titles: {
    main: {
      data: {
        participants: 'Meeting Participants',
        duration: 'Meeting Duration',
        status: 'Meeting Status'
      }
    }
  }
}

export const Simple: Story = {
  args: {
    data: mockSimpleData
  }
}

export const WithEngineData: Story = {
  args: {
    data: engineResponse
  }
}
