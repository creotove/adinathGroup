import { createSlice } from '@reduxjs/toolkit'

export const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebarVisible: true, // Initially, the sidebar is hidden
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarVisible = !state.sidebarVisible
    },
  },
})

export const { showSidebar, hideSidebar, toggleSidebar } = sideBarSlice.actions
