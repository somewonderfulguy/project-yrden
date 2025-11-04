import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Shadcn/Input',
  component: Input,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled',
  },
}

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder',
  },
}

export const WithValue: Story = {
  args: {
    value: 'Value',
  },
}

export const File: Story = {
  args: {
    type: 'file',
  },
}

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Invalid',
  },
}
