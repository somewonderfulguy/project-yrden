import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './Tooltip'
import { Button } from '../Button'

const meta: Meta<typeof TooltipProvider> = {
  title: 'Components/Shadcn/Tooltip',
  component: TooltipProvider,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const Customized: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip delayDuration={1500}>
        <TooltipTrigger asChild>
          <Button>Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={-5}>
          Tooltip
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const AlwaysOpen: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger asChild>
          <Button>Open</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
