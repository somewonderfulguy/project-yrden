import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from './Sidebar'

const meta: Meta<typeof SidebarProvider> = {
  title: 'Components/Shadcn/Sidebar',
  component: SidebarProvider,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main>
        <SidebarTrigger />
        <div>Content</div>
      </main>
    </SidebarProvider>
  ),
}
