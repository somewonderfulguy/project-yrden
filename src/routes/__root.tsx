import type { ReactNode } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { SideControls, SidebarProvider } from '@/components'

import '../css'
import styles from './__root.module.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Project Yrden' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SidebarProvider>
          <SideControls />
          <main className={styles.main}>{children}</main>
          <Scripts />
        </SidebarProvider>
      </body>
    </html>
  )
}
