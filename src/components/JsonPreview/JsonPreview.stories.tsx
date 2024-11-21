import type { Meta, StoryObj } from '@storybook/react';

import JsonPreview from './index';
import { Template } from '../../types/template';
import { TemplateProvider } from '../../contexts/TemplateContext';

const sampleTemplate: Template = {
  data: {
    userName: {
      name: 'User Name',
      description: 'The name of the user',
      prompt: 'What is your name?',
      type: 'string',
    },
    preferences: {
      name: 'User Preferences',
      description: 'User configuration settings',
      prompt: 'Enter user preferences',
      type: 'object',
      attributes: {
        theme: 'dark',
        language: 'en',
      },
    },
  },
  workflow: {
    greeting: {
      name: 'Greeting Step',
      description: 'Initial greeting workflow',
      prompt: 'Generate a greeting',
      data: ['preferences'],
    },
  },
};

const meta: Meta<typeof JsonPreview> = {
  title: 'Components/JsonPreview',
  component: JsonPreview,
  decorators: [
    (Story) => (
      <TemplateProvider initialTemplate={sampleTemplate}>
        <Story />
      </TemplateProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof JsonPreview>;

export const Default: Story = {
  args: {},
};

export const WithSim: Story = {
  args: {},
};
