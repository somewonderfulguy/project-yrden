import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Shadcn/Separator',
  component: Separator,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    style: {
      width: 800,
    },
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    style: {
      height: 300,
    },
  },
}
