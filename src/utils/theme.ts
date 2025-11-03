const THEME_STORAGE_KEY = 'theme'

export type ThemeName = 'light' | 'dark'

export const getStoredTheme = (): ThemeName | null => {
  try {
    return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null) ?? null
  } catch {
    return null
  }
}

export const applyTheme = (name: ThemeName, { animate = true } = {}): void => {
  const root = document.documentElement
  const setTheme = () => {
    root.dataset.theme = name
    try {
      localStorage.setItem(THEME_STORAGE_KEY, name)
    } catch {
      /* noop */
    }
  }

  if (animate && 'startViewTransition' in document) {
    document.startViewTransition(() => setTheme())
  } else {
    setTheme()
  }
}

export const initTheme = (fallback: ThemeName = 'light'): void => {
  const stored = getStoredTheme()
  applyTheme(stored ?? fallback, { animate: false })
}
