import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/visual-patterns')({
  ssr: false,
  component: () => <div>Visual Patterns page</div>,
})
