import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input, Button } from '..'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '.'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Shadcn/Sheet',
  component: Sheet,
}

export default meta
type Story = StoryObj<typeof meta>

const SheetDemo = ({
  side = 'right',
}: {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">Open ({side})</Button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </SheetDescription>
      </SheetHeader>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <Input
          id="sheet-demo-name"
          placeholder="Name"
          defaultValue="Pedro Duarte"
        />
        <Input
          id="sheet-demo-username"
          placeholder="Username"
          defaultValue="@peduarte"
        />
      </div>
      <SheetFooter>
        <Button type="submit">Save changes</Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
)

export const SideRight: Story = {
  render: () => <SheetDemo />,
}

export const SideLeft: Story = {
  render: () => <SheetDemo side="left" />,
}

export const SideTop: Story = {
  render: () => <SheetDemo side="top" />,
}

export const SideBottom: Story = {
  render: () => <SheetDemo side="bottom" />,
}
