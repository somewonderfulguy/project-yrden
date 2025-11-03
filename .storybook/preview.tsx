import type { Decorator, Preview } from '@storybook/react-vite'
import { useEffect, type ReactNode } from 'react'

import { initTheme, applyTheme } from '../src/utils/theme'
import '../src/css'

initTheme('light')

export const ThemeManager = ({
  theme,
  children,
}: {
  theme: 'light' | 'dark'
  children: ReactNode
}) => {
  useEffect(() => {
    if (theme) {
      applyTheme(theme, { animate: false })
    }
  }, [theme])

  return <div data-theme={theme}>{children}</div>
}

const ProvidersDecorator: Decorator = (Story, context) => {
  const theme = (context.globals.theme as 'light' | 'dark') || 'light'

  return (
    <ThemeManager theme={theme}>
      <Story />
    </ThemeManager>
  )
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'UI theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [ProvidersDecorator],
}

export default preview
