import type { Meta, StoryObj } from '@storybook/react-vite'

import { XIcon } from '@/assets'

import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Shadcn/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof meta>

export const Medium: Story = {
  args: {
    children: 'Button',
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    children: 'Button',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'lg',
  },
}

export const Icon: Story = {
  args: {
    children: <XIcon />,
    size: 'icon',
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <XIcon />
        Close
      </>
    ),
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Button',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Button',
  },
}
