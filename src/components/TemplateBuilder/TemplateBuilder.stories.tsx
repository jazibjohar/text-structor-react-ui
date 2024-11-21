import type { Meta, StoryObj } from '@storybook/react';

import TemplateBuilder from './index';
import { TemplateProvider } from '../../contexts/TemplateContext';

const meta: Meta<typeof TemplateBuilder> = {
  title: 'Components/TemplateBuilder',
  component: TemplateBuilder,
  decorators: [
    (Story) => (
      <TemplateProvider>
        <Story />
      </TemplateProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TemplateBuilder>;

export const Default: Story = {
  args: {
    // Add any required props here
    // For example:
    // initialTemplate: {},
    // onChange: () => {},
  },
  parameters: {
    controls: { expanded: true },
  },
};
