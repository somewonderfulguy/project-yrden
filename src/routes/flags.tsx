import { createFileRoute } from '@tanstack/react-router'

import { FlagsPage } from '../pages'

export const Route = createFileRoute('/flags')({
  ssr: false,
  component: () => <FlagsPage />,
})
