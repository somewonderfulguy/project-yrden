import { createFileRoute } from '@tanstack/react-router'

import { RagingSea } from '../pages'

export const Route = createFileRoute('/raging-sea')({
  ssr: false,
  component: () => <RagingSea />,
})
