import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Shadcn/Skeleton',
  component: Skeleton,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    style: {
      width: 100,
      height: 100,
    },
  },
}
