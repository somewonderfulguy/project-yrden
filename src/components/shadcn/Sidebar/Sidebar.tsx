'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ComponentProps,
  type CSSProperties,
} from 'react'
import { Slot } from '@radix-ui/react-slot'

import { PanelLeftIcon } from '@/assets'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import {
  Button,
  Input,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '..'

import styles from './Sidebar.module.css'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarContextProps = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

const SidebarProvider = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open],
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed'

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as CSSProperties
          }
          className={cn(styles.wrapper, className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

const Sidebar = ({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: ComponentProps<'div'> & {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(styles.sidebarStatic, className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className={styles.mobileSheetContent}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className={styles.mobileSheetInner}>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={styles.sidebarRoot}
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div data-slot="sidebar-gap" className={styles.sidebarGap} />
      <div
        data-slot="sidebar-container"
        className={cn(styles.sidebarContainer, className)}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={styles.sidebarInner}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const SidebarTrigger = ({
  className,
  onClick,
  ...props
}: ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn(styles.trigger, className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

const SidebarRail = ({ className, ...props }: ComponentProps<'button'>) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(styles.rail, className)}
      {...props}
    />
  )
}

const SidebarInset = ({ className, ...props }: ComponentProps<'main'>) => (
  <main
    data-slot="sidebar-inset"
    className={cn(styles.inset, className)}
    {...props}
  />
)

const SidebarInput = ({
  className,
  ...props
}: ComponentProps<typeof Input>) => (
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    className={cn(styles.input, className)}
    {...props}
  />
)

const SidebarHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    className={cn(styles.header, className)}
    {...props}
  />
)

const SidebarFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    className={cn(styles.footer, className)}
    {...props}
  />
)

const SidebarSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>) => (
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    className={cn(styles.separator, className)}
    {...props}
  />
)

const SidebarContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    className={cn(styles.content, className)}
    {...props}
  />
)

const SidebarGroup = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    className={cn(styles.group, className)}
    {...props}
  />
)

const SidebarGroupLabel = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'div'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(styles.groupLabel, className)}
      {...props}
    />
  )
}

const SidebarGroupAction = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(styles.groupAction, className)}
      {...props}
    />
  )
}

const SidebarGroupContent = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    className={cn(styles.groupContent, className)}
    {...props}
  />
)

const SidebarMenu = ({ className, ...props }: ComponentProps<'ul'>) => (
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    className={cn(styles.menu, className)}
    {...props}
  />
)

const SidebarMenuItem = ({ className, ...props }: ComponentProps<'li'>) => (
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    className={cn(styles.menuItem, className)}
    {...props}
  />
)

type MenuButtonVariant = 'default' | 'outline'
type MenuButtonSize = 'default' | 'sm' | 'lg'

const SidebarMenuButton = ({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | ComponentProps<typeof TooltipContent>
  variant?: MenuButtonVariant
  size?: MenuButtonSize
}) => {
  const Comp = asChild ? Slot : 'button'
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        styles.menuButton,
        styles[`menuButton-variant-${variant}` as const],
        styles[`menuButton-size-${size}` as const],
        className,
      )}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

const SidebarMenuAction = ({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: ComponentProps<'button'> & {
  asChild?: boolean
  showOnHover?: boolean
}) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        styles.menuAction,
        showOnHover && styles.menuActionShow,
        className,
      )}
      {...props}
    />
  )
}

const SidebarMenuBadge = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    className={cn(styles.menuBadge, className)}
    {...props}
  />
)

const SidebarMenuSkeleton = ({
  className,
  showIcon = false,
  ...props
}: ComponentProps<'div'> & {
  showIcon?: boolean
}) => {
  // Random width between 50 to 90%.
  const width = useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn(styles.menuSkeleton, className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className={styles.menuSkeletonIcon}
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className={styles.menuSkeletonText}
        data-sidebar="menu-skeleton-text"
        style={{ '--skeleton-width': width } as CSSProperties}
      />
    </div>
  )
}

const SidebarMenuSub = ({ className, ...props }: ComponentProps<'ul'>) => (
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-sub"
    className={cn(styles.menuSub, className)}
    {...props}
  />
)

const SidebarMenuSubItem = ({ className, ...props }: ComponentProps<'li'>) => (
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    className={cn(styles.menuSubItem, className)}
    {...props}
  />
)

const SidebarMenuSubButton = ({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: ComponentProps<'a'> & {
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        styles.menuSubButton,
        size === 'sm' ? styles.menuSubButtonSm : styles.menuSubButtonMd,
        className,
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
