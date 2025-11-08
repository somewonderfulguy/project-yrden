import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
} from '..'

import styles from './SideControls.module.css'

/** Sidebar and top-left controls */
export const SideControls = () => (
  <>
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>

    <div className={styles.controls}>test</div>
  </>
)
